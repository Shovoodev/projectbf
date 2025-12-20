import crypto from "crypto";
const SECRET = "blacktulip";
export const random = () => crypto.randomBytes(128).toString("base64");
export const invoiceId = () => {
  return crypto.randomInt(10000000, 100000000).toString();
};

export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};
