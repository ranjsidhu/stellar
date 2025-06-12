// UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
// UPSTASH_REDIS_REST_TOKEN=your-rest-token-here

// middleware.ts (in root directory)
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// Initialize Upstash Redis
const redis = Redis.fromEnv();

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  message?: string;
}

interface RateLimitRule {
  pattern: string | RegExp;
  config: RateLimitConfig;
  exclude?: boolean;
}

const rateLimitRules: RateLimitRule[] = [
  // Exclude session endpoint - no rate limiting
  {
    pattern: "/api/auth/session",
    config: { windowMs: 0, maxRequests: 0 },
    exclude: true,
  },

  // Strict limits for auth endpoints (except session)
  {
    pattern: /^\/api\/auth\/(?!session)/,
    config: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 5,
      message: "Too many authentication attempts",
    },
  },

  // Public API endpoints with higher limits
  {
    pattern: "/api/public/:path*",
    config: {
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 200,
    },
  },

  // User-specific endpoints
  {
    pattern: "/api/user/:userId/:path*",
    config: {
      windowMs: 60 * 1000,
      maxRequests: 500,
      message: "User API rate limit exceeded",
    },
  },

  // Admin endpoints - very strict
  {
    pattern: "/api/admin/:path*",
    config: {
      windowMs: 60 * 1000,
      maxRequests: 10,
      message: "Admin API rate limit exceeded",
    },
  },

  // Webhook endpoints
  {
    pattern: /^\/api\/webhooks?\//,
    config: {
      windowMs: 60 * 1000,
      maxRequests: 100,
    },
  },

  // Default for all other API routes
  {
    pattern: "/api/:path*",
    config: {
      windowMs: 60 * 1000,
      maxRequests: 50,
    },
  },
];

function getClientIdentifier(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0] ?? realIP ?? "unknown";
  return ip;
}

function matchesPattern(pathname: string, pattern: string | RegExp): boolean {
  if (pattern instanceof RegExp) {
    return pattern.test(pathname);
  }

  const regexPattern = pattern
    .replace(/:\w+\*/g, "(.*)")
    .replace(/:\w+/g, "([^/]+)")
    .replace(/\//g, "\\/");

  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(pathname);
}

function getRateLimitRule(pathname: string): RateLimitRule | null {
  for (const rule of rateLimitRules) {
    if (matchesPattern(pathname, rule.pattern)) {
      return rule;
    }
  }
  return null;
}

async function checkRateLimit(
  key: string,
  config: RateLimitConfig
): Promise<{
  allowed: boolean;
  count: number;
  remaining: number;
  resetTime: number;
}> {
  const now = Date.now();
  const windowStart = now - config.windowMs;

  try {
    // Use Redis sorted set to track requests with timestamps
    const pipeline = redis.pipeline();

    // Remove old entries outside the time window
    pipeline.zremrangebyscore(key, 0, windowStart);

    // Add current request
    pipeline.zadd(key, { score: now, member: `${now}-${Math.random()}` });

    // Get current count
    pipeline.zcard(key);

    // Set expiration (slightly longer than window to ensure cleanup)
    pipeline.expire(key, Math.ceil(config.windowMs / 1000) + 10);

    const results = await pipeline.exec();

    // Extract count from pipeline results
    const count = (results?.[2] as number) || 0;
    const remaining = Math.max(0, config.maxRequests - count);
    const resetTime = now + config.windowMs;

    return {
      allowed: count <= config.maxRequests,
      count,
      remaining,
      resetTime,
    };
  } catch (error) {
    console.error("Redis rate limit error:", error);

    // Fail open - allow request if Redis is down
    // This prevents your app from breaking if Upstash has issues
    return {
      allowed: true,
      count: 0,
      remaining: config.maxRequests,
      resetTime: now + config.windowMs,
    };
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply rate limiting to API routes
  if (!pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const rule = getRateLimitRule(pathname);
  if (!rule || rule.exclude) {
    return NextResponse.next();
  }

  const config = rule.config;
  const clientId = getClientIdentifier(request);
  const key = `rate_limit:${pathname}:${clientId}`;

  const rateLimitResult = await checkRateLimit(key, config);
  const resetTimeSeconds = Math.ceil(
    (rateLimitResult.resetTime - Date.now()) / 1000
  );

  // Create response (either 429 or continue)
  const response = rateLimitResult.allowed
    ? NextResponse.next()
    : NextResponse.json(
        {
          error: config.message ?? "Rate limit exceeded",
          retryAfter: resetTimeSeconds,
        },
        { status: 429 }
      );

  // Add rate limit headers to all responses
  response.headers.set("X-RateLimit-Limit", config.maxRequests.toString());
  response.headers.set(
    "X-RateLimit-Remaining",
    rateLimitResult.remaining.toString()
  );
  response.headers.set(
    "X-RateLimit-Reset",
    rateLimitResult.resetTime.toString()
  );

  if (!rateLimitResult.allowed) {
    response.headers.set("Retry-After", resetTimeSeconds.toString());
  }

  return response;
}

export const config = {
  matcher: ["/api/:path*"],
};
