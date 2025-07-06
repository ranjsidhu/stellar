import logger from "./logger";

// Database Event Logging
export const databaseEvent = {
  query: (operation: string, table: string, userId?: string, details?: any) => {
    logger.info("Database Query", {
      event: "database_query",
      operation,
      table,
      userId,
      details,
      timestamp: new Date().toISOString(),
    });
  },

  create: (
    table: string,
    recordId: number | string,
    userId?: string,
    details?: any
  ) => {
    logger.info("Database Create", {
      event: "database_create",
      table,
      recordId,
      userId,
      details,
      timestamp: new Date().toISOString(),
    });
  },

  update: (
    table: string,
    recordId: number | string,
    userId?: string,
    changes?: any
  ) => {
    logger.info("Database Update", {
      event: "database_update",
      table,
      recordId,
      userId,
      changes,
      timestamp: new Date().toISOString(),
    });
  },

  delete: (
    table: string,
    recordId: number | string,
    userId?: string,
    details?: any
  ) => {
    logger.info("Database Delete", {
      event: "database_delete",
      table,
      recordId,
      userId,
      details,
      timestamp: new Date().toISOString(),
    });
  },

  error: (operation: string, table: string, error: any, userId?: string) => {
    logger.error("Database Error", {
      event: "database_error",
      operation,
      table,
      error: error.message ?? error,
      stack: error.stack,
      userId,
      timestamp: new Date().toISOString(),
    });
  },
};

// Authentication Event Logging
export const authEvent = {
  login: (
    userId: string,
    email: string,
    provider: string,
    success: boolean,
    details?: any
  ) => {
    const level = success ? "info" : "warn";
    logger[level]("Authentication Login", {
      event: "auth_login",
      userId,
      email,
      provider,
      success,
      details,
      timestamp: new Date().toISOString(),
    });
  },

  signup: (
    userId: string,
    email: string,
    provider: string,
    success: boolean,
    details?: any
  ) => {
    const level = success ? "info" : "warn";
    logger[level]("Authentication Signup", {
      event: "auth_signup",
      userId,
      email,
      provider,
      success,
      details,
      timestamp: new Date().toISOString(),
    });
  },

  logout: (userId: string, email: string) => {
    logger.info("Authentication Logout", {
      event: "auth_logout",
      userId,
      email,
      timestamp: new Date().toISOString(),
    });
  },

  passwordReset: (email: string, success: boolean, details?: any) => {
    const level = success ? "info" : "warn";
    logger[level]("Password Reset", {
      event: "auth_password_reset",
      email,
      success,
      details,
      timestamp: new Date().toISOString(),
    });
  },

  unauthorized: (email?: string, reason?: string, ip?: string) => {
    logger.warn("Unauthorized Access", {
      event: "auth_unauthorized",
      email,
      reason,
      ip,
      timestamp: new Date().toISOString(),
    });
  },
};

// File Operation Logging
export const fileEvent = {
  upload: (
    userId: string,
    fileId: string,
    filename: string,
    fileType: string,
    success: boolean,
    details?: any
  ) => {
    const level = success ? "info" : "error";
    logger[level]("File Upload", {
      event: "file_upload",
      userId,
      fileId,
      filename,
      fileType,
      success,
      details,
      timestamp: new Date().toISOString(),
    });
  },

  download: (
    userId: string,
    fileId: string,
    filename: string,
    success: boolean
  ) => {
    const level = success ? "info" : "error";
    logger[level]("File Download", {
      event: "file_download",
      userId,
      fileId,
      filename,
      success,
      timestamp: new Date().toISOString(),
    });
  },

  delete: (
    userId: string,
    fileId: string,
    filename: string,
    success: boolean
  ) => {
    const level = success ? "info" : "error";
    logger[level]("File Delete", {
      event: "file_delete",
      userId,
      fileId,
      filename,
      success,
      timestamp: new Date().toISOString(),
    });
  },

  error: (operation: string, userId: string, error: any, details?: any) => {
    logger.error("File Operation Error", {
      event: "file_error",
      operation,
      userId,
      error: error.message ?? error,
      details,
      timestamp: new Date().toISOString(),
    });
  },
};

// Email Event Logging
export const emailEvent = {
  sent: (
    type: string,
    to: string,
    subject: string,
    success: boolean,
    details?: any
  ) => {
    const level = success ? "info" : "error";
    logger[level]("Email Sent", {
      event: "email_sent",
      type,
      to,
      subject,
      success,
      details,
      timestamp: new Date().toISOString(),
    });
  },

  signup: (email: string, name: string, success: boolean) => {
    const level = success ? "info" : "error";
    logger[level]("Signup Email", {
      event: "email_signup",
      email,
      name,
      success,
      timestamp: new Date().toISOString(),
    });
  },

  contact: (
    from: string,
    name: string,
    subject: string,
    success: boolean,
    details?: any
  ) => {
    const level = success ? "info" : "error";
    logger[level]("Contact Form Email", {
      event: "email_contact",
      from,
      name,
      subject,
      success,
      details,
      timestamp: new Date().toISOString(),
    });
  },

  passwordReset: (email: string, success: boolean) => {
    const level = success ? "info" : "error";
    logger[level]("Password Reset Email", {
      event: "email_password_reset",
      email,
      success,
      timestamp: new Date().toISOString(),
    });
  },

  error: (type: string, error: any, details?: any) => {
    logger.error("Email Error", {
      event: "email_error",
      type,
      error: error.message ?? error,
      details,
      timestamp: new Date().toISOString(),
    });
  },
};

// Job Application Event Logging
export const applicationEvent = {
  submitted: (
    userId: string,
    jobId: number,
    jobTitle: string,
    success: boolean,
    details?: any
  ) => {
    const level = success ? "info" : "error";
    logger[level]("Job Application Submitted", {
      event: "application_submitted",
      userId,
      jobId,
      jobTitle,
      success,
      details,
      timestamp: new Date().toISOString(),
    });
  },

  statusChange: (
    applicationId: number,
    userId: string,
    oldStatus: string,
    newStatus: string,
    details?: any
  ) => {
    logger.info("Application Status Change", {
      event: "application_status_change",
      applicationId,
      userId,
      oldStatus,
      newStatus,
      details,
      timestamp: new Date().toISOString(),
    });
  },

  withdrawn: (applicationId: number, userId: string, jobTitle: string) => {
    logger.info("Application Withdrawn", {
      event: "application_withdrawn",
      applicationId,
      userId,
      jobTitle,
      timestamp: new Date().toISOString(),
    });
  },

  duplicate: (userId: string, jobId: number, jobTitle: string) => {
    logger.warn("Duplicate Application Attempt", {
      event: "application_duplicate",
      userId,
      jobId,
      jobTitle,
      timestamp: new Date().toISOString(),
    });
  },

  error: (operation: string, userId: string, error: any, details?: any) => {
    logger.error("Application Error", {
      event: "application_error",
      operation,
      userId,
      error: error.message ?? error,
      details,
      timestamp: new Date().toISOString(),
    });
  },
};

// API Request Logging
export const apiEvent = {
  request: (
    method: string,
    path: string,
    userId?: string,
    ip?: string,
    userAgent?: string
  ) => {
    logger.http("API Request", {
      event: "api_request",
      method,
      path,
      userId,
      ip,
      userAgent,
      timestamp: new Date().toISOString(),
    });
  },

  response: (
    method: string,
    path: string,
    statusCode: number,
    responseTime: number,
    userId?: string
  ) => {
    const level = statusCode >= 400 ? "warn" : "http";
    logger[level]("API Response", {
      event: "api_response",
      method,
      path,
      statusCode,
      responseTime,
      userId,
      timestamp: new Date().toISOString(),
    });
  },

  error: (
    method: string,
    path: string,
    error: any,
    userId?: string,
    details?: any
  ) => {
    logger.error("API Error", {
      event: "api_error",
      method,
      path,
      error: error.message ?? error,
      stack: error.stack,
      userId,
      details,
      timestamp: new Date().toISOString(),
    });
  },
};

// General System Event Logging
export const systemEvent = {
  startup: (details?: any) => {
    logger.info("System Startup", {
      event: "system_startup",
      details,
      timestamp: new Date().toISOString(),
    });
  },

  shutdown: (details?: any) => {
    logger.info("System Shutdown", {
      event: "system_shutdown",
      details,
      timestamp: new Date().toISOString(),
    });
  },

  error: (component: string, error: any, details?: any) => {
    logger.error("System Error", {
      event: "system_error",
      component,
      error: error.message ?? error,
      stack: error.stack,
      details,
      timestamp: new Date().toISOString(),
    });
  },

  warning: (component: string, message: string, details?: any) => {
    logger.warn("System Warning", {
      event: "system_warning",
      component,
      message,
      details,
      timestamp: new Date().toISOString(),
    });
  },
};
