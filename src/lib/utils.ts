import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resolves image URLs to absolute paths.
 * If the URL is already absolute (starts with http:// or https://), returns it unchanged.
 * Otherwise, prepends the API server's origin (base URL without /api path segment).
 */
export function resolveImageUrl(url: string | undefined | null): string {
  if (!url) return "/placeholder.jpg";

  // Return absolute URLs unchanged
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Get API base URL and remove /api suffix to get the origin
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const origin = API_BASE_URL.replace(/\/api$/, "");

  // Remove leading slash from relative path if present to avoid double slashes
  const relativePath = url.startsWith("/") ? url : `/${url}`;

  return `${origin}${relativePath}`;
}
