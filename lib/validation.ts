const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export function isValidEmail(raw: string): boolean {
  const email = raw.trim();
  if (email.length === 0 || email.length > 254) return false;
  return EMAIL_RE.test(email);
}

export function isValidReferralCode(code: string): boolean {
  return /^[A-Z0-9]{5,10}$/.test(code.trim().toUpperCase());
}
