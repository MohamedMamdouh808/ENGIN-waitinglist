// Unambiguous alphabet: no 0/O or 1/I, so codes are easy to read aloud
// or retype from a screenshot.
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateReferralCode(length = 6): string {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return code;
}

// Deterministic, privacy-safe display name for the public leaderboard.
// Derived from the row's own id so it's stable across requests without
// ever being (or leaking) the user's email.
export function displayAliasFrom(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const suffix = hash.toString(16).slice(0, 3).toUpperCase().padStart(3, "0");
  return `Builder #${suffix}`;
}

export function referralLink(siteUrl: string, code: string): string {
  const base = siteUrl.replace(/\/$/, "");
  return `${base}/?ref=${code}`;
}
