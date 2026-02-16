import crypto from "crypto";
const SECRET = "blacktulip";
export const random = () => crypto.randomBytes(128).toString("base64");
export const invoiceId = (): string => {
  return `BTF${Date.now().toString().slice(-5)}${crypto.randomInt(100, 999)}`;
};

export const authentication = (salt: any, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};

export function validateRecipient(email : any) {
  if (typeof email !== "string") throw new Error("Invalid email");
  const e = email.trim();

  // Block header injection
  if (/[\r\n]/.test(e)) throw new Error("Invalid email");

  // Block quoted local-parts entirely (most apps don't need them)
  // e.g.  "xclow3n@gmail.com x"@internal.domain
  if (/^"\s*.*"\s*@/i.test(e)) throw new Error("Invalid email");

  // Block any @ inside local-part (before the last @)
  const at = e.lastIndexOf("@");
  if (at <= 0) throw new Error("Invalid email");
  const local = e.slice(0, at);
  if (local.includes("@")) throw new Error("Invalid email");


  // Block group syntax
  if (/[;:]/.test(e)) throw new Error("Invalid email");

  // Basic “normal email” allowlist (adjust if needed)
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e)) {
    throw new Error("Invalid email");
  }

  return e;
}
