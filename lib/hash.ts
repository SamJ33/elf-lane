import crypto from "crypto";

export function hashName(name: string) {
  return crypto
    .createHash("sha256")
    .update(name.trim().toLowerCase())
    .digest("hex");
}
export async function hashGiftTarget(name: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(name.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

