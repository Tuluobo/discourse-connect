/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Time formatting utilities with i18n support
 */

/**
 * Format time ago with i18n support
 * @param date - The date to format
 * @param t - Translation function
 * @returns Formatted time ago string
 */
export function formatTimeAgo(
  date: Date,
  t: (key: string, params?: any) => string,
): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInDays > 0) {
    return t("common.time.daysAgo", { count: diffInDays });
  } else if (diffInHours > 0) {
    return t("common.time.hoursAgo", { count: diffInHours });
  } else if (diffInMinutes > 0) {
    return t("common.time.minutesAgo", { count: diffInMinutes });
  } else {
    return t("common.time.justNow");
  }
}

/**
 * Format member since time with i18n support
 * @param date - The date to format
 * @param t - Translation function
 * @returns Formatted member since string
 */
export function formatMemberSince(
  date: Date,
  t: (key: string, params?: Record<string, any>) => string,
): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 30) {
    return t("memberSince.days", { count: diffInDays });
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return t("memberSince.months", { count: months });
  } else {
    const years = Math.floor(diffInDays / 365);
    return t("memberSince.years", { count: years });
  }
}

/**
 * Format relative time with different contexts
 * @param date - The date to format
 * @param t - Translation function
 * @param context - The translation context (e.g., "card", "dashboard")
 * @returns Formatted time string
 */
export function formatRelativeTime(
  date: Date,
  t: (key: string, params?: Record<string, any>) => string,
  context: string = "",
): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  const prefix = context ? `${context}.` : "";

  if (diffInDays > 0) {
    return t(`${prefix}common.time.daysAgo`, { count: diffInDays });
  } else if (diffInHours > 0) {
    return t(`${prefix}common.time.hoursAgo`, { count: diffInHours });
  } else if (diffInMinutes > 0) {
    return t(`${prefix}common.time.minutesAgo`, { count: diffInMinutes });
  } else {
    return t(`${prefix}common.time.justNow`);
  }
}
