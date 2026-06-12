/**
 * Generates clean, URL-safe semantic slugs supporting both English and Arabic.
 * This ensures clean, SEO-indexed URLs for direct user sharing.
 */
export function generateSlug(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    // Keep standard letters, numbers, spaces, hyphens, and Arabic unicode letters Range (\u0600-\u06FF)
    .replace(/[^\u0600-\u06FFa-zA-Z0-9\s-]/g, '')
    // Replace whitespace and multiple hyphens/underscores with a single hyphen
    .replace(/[\s\-_]+/g, '-')
    // Trim hyphens from ends
    .replace(/^-+|-+$/g, '')
    .trim();
}
