import { NextRequest, NextResponse } from "next/server";
import {
  checkAdminAccess,
  checkRecruiterAccess,
  checkAdminOrRecruiterAccess,
} from "@/app/utils/auth";
import { getSession } from "@/app/utils/session";

// eslint-disable-next-line no-unused-vars
type RouteHandler = (req: NextRequest, context?: any) => Promise<NextResponse>;

export function withUserProtection(handler: RouteHandler): RouteHandler {
  return async (req, context) => {
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { isAuthorized: false, error: "Unauthorized: No session found" },
        { status: 401 }
      );
    }

    return handler(req, context);
  };
}
export function withAdminProtection(handler: RouteHandler): RouteHandler {
  return async (req, context) => {
    const { isAuthorized, response } = await checkAdminAccess();
    if (!isAuthorized && response) {
      return response;
    }
    return handler(req, context);
  };
}

export function withRecruiterProtection(handler: RouteHandler): RouteHandler {
  return async (req, context) => {
    const { isAuthorized, response } = await checkRecruiterAccess();
    if (!isAuthorized && response) {
      return response;
    }
    return handler(req, context);
  };
}

export function withAdminOrRecruiterProtection(
  handler: RouteHandler
): RouteHandler {
  return async (req, context) => {
    const { isAuthorized, response } = await checkAdminOrRecruiterAccess();
    if (!isAuthorized && response) {
      return response;
    }
    return handler(req, context);
  };
}
