import { NextRequest, NextResponse } from "next/server";
import { apiEvent } from "./logging";

export function withLogging(
  // eslint-disable-next-line no-unused-vars
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    const startTime = Date.now();
    const method = req.method;
    const path = req.nextUrl.pathname;

    // Extract user information from headers or session if available
    let userId: string | undefined;
    let ip: string | undefined;
    let userAgent: string | undefined;

    try {
      // Get IP address
      ip =
        req.headers.get("x-forwarded-for") ??
        req.headers.get("x-real-ip") ??
        "unknown";

      // Get user agent
      userAgent = req.headers.get("user-agent") ?? "unknown";

      // Try to get user ID from headers (if set by auth middleware)
      userId = req.headers.get("x-user-id") ?? undefined;

      // Log the incoming request
      apiEvent.request(method, path, userId, ip, userAgent);

      // Execute the handler
      const response = await handler(req);

      // Calculate response time
      const responseTime = Date.now() - startTime;

      // Log the response
      apiEvent.response(method, path, response.status, responseTime, userId);

      return response;
    } catch (error: any) {
      // eslint-disable-next-line no-unused-vars
      // Calculate response time
      const responseTime = Date.now() - startTime;

      // Log the error with response time
      apiEvent.error(method, path, error, userId, { responseTime });

      // Return error response
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  };
}

// Higher-order function to wrap route handlers with logging
export function withRouteLogging<T extends any[]>(
  // eslint-disable-next-line no-unused-vars
  handler: (req: NextRequest, ...args: T) => Promise<NextResponse>
) {
  return async (req: NextRequest, ...args: T) => {
    const startTime = Date.now();
    const method = req.method;
    const path = req.nextUrl.pathname;

    // Extract user information
    let userId: string | undefined;
    let ip: string | undefined;
    let userAgent: string | undefined;

    try {
      // Get IP address
      ip =
        req.headers.get("x-forwarded-for") ??
        req.headers.get("x-real-ip") ??
        "unknown";

      // Get user agent
      userAgent = req.headers.get("user-agent") ?? "unknown";

      // Try to get user ID from headers
      userId = req.headers.get("x-user-id") ?? undefined;

      // Log the incoming request
      apiEvent.request(method, path, userId, ip, userAgent);

      // Execute the handler
      const response = await handler(req, ...args);

      // Calculate response time
      const responseTime = Date.now() - startTime;

      // Log the response
      apiEvent.response(method, path, response.status, responseTime, userId);

      return response;
    } catch (error: any) {
      // eslint-disable-next-line no-unused-vars
      // Calculate response time
      const responseTime = Date.now() - startTime;

      // Log the error with response time
      apiEvent.error(method, path, error, userId, { responseTime });

      // Return error response
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  };
}

// Utility function to set user ID in request headers for logging
export function setUserIdHeader(req: NextRequest, userId: string) {
  req.headers.set("x-user-id", userId);
}

// Utility function to get user ID from request headers
export function getUserIdFromHeader(req: NextRequest): string | undefined {
  return req.headers.get("x-user-id") ?? undefined;
}
