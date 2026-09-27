// Privacy-safe public label for an email address: mo***@gmail.com
// Only ever called server-side — raw email never leaves the server.
export function maskEmail(emailNormalized: string): string {
  const at = emailNormalized.indexOf("@");
  if (at <= 0) return "Builder";
  const local = emailNormalized.slice(0, at);
  const domain = emailNormalized.slice(at + 1);
  const head = local.slice(0, 2);
  return `${head}***@${domain}`;
}

// Resolution order for a public leaderboard label:
// 1. user-chosen display name, 2. masked email, 3. generated alias.
export function publicLabel(opts: {
  displayName: string | null;
  emailNormalized: string;
  displayAlias: string;
}): string {
  const name = (opts.displayName ?? "").trim().slice(0, 40);
  if (name) return name;
  const masked = maskEmail(opts.emailNormalized);
  if (masked !== "Builder") return masked;
  return opts.displayAlias;
}
