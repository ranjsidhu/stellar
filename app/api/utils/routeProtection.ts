import { NextRequest, NextResponse } from "next/server";
import {
  checkAdminAccess,
  checkRecruiterAccess,
  checkAdminOrRecruiterAccess,
} from "@/app/utils/auth";

// eslint-disable-next-line no-unused-vars
type RouteHandler = (req: NextRequest, context?: any) => Promise<NextResponse>;

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
