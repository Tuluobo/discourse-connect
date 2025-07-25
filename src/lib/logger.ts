/* eslint-disable @typescript-eslint/no-explicit-any */
// Global Logger utility for production-ready logging
const isDevelopment = process.env.NODE_ENV === "development";
const isDebugEnabled = process.env.DEBUG === "true" || isDevelopment;

export const logger = {
  // Always log errors
  error: (message: string, ...args: any[]) => {
    console.error(`[Error] ${message}`, ...args);
  },

  // Log warnings in all environments
  warn: (message: string, ...args: any[]) => {
    console.warn(`[Warning] ${message}`, ...args);
  },

  // Only log info in development or when debug is enabled
  info: (message: string, ...args: any[]) => {
    if (isDebugEnabled) {
      console.log(`[Info] ${message}`, ...args);
    }
  },

  // Only log debug in development or when debug is enabled
  debug: (message: string, ...args: any[]) => {
    if (isDebugEnabled) {
      console.log(`[Debug] ${message}`, ...args);
    }
  },

  // Security-sensitive logging - sanitize data
  security: (message: string, data?: Record<string, any>) => {
    if (isDebugEnabled && data) {
      const sanitized = sanitizeSecurityData(data);
      console.log(`[Security] ${message}`, sanitized);
    } else if (isDebugEnabled) {
      console.log(`[Security] ${message}`);
    }
  },
};

// Sanitize sensitive data for logging
function sanitizeSecurityData(data: Record<string, any>): Record<string, any> {
  const sanitized = { ...data };

  // List of sensitive fields to redact
  const sensitiveFields = [
    "client_secret",
    "code",
    "access_token",
    "refresh_token",
    "code_verifier",
    "code_challenge",
    "token",
    "authorization",
  ];

  sensitiveFields.forEach((field) => {
    if (sanitized[field]) {
      if (
        typeof sanitized[field] === "string" &&
        sanitized[field].length > 10
      ) {
        sanitized[field] =
          `${sanitized[field].substring(0, 6)}...${sanitized[field].slice(-4)}`;
      } else {
        sanitized[field] = "[REDACTED]";
      }
    }
  });

  return sanitized;
}
