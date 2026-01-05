import crypto from "crypto";
const SECRET = "blacktulip";
export const random = () => crypto.randomBytes(128).toString("base64");
export const invoiceId = (): string => {
  return `${Date.now().toString().slice(-5)}${crypto.randomInt(100, 999)}`;
};

export const authentication = (salt: any, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};
