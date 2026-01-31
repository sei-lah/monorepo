import crypto from "node:crypto";

const TOKEN_REGEX = /^(\.+):(\.+):([\d.]+).([^.]+)$/;

export function sign(payload: string, secret: string, minutes: number): string {
  const exp = Math.floor(Date.now() / 1000) + 60 * minutes;
  const sig = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}:${exp}.${sig}`;
}

function parseToken(token: string): { uid: string; cid: string; exp: number; sig: string } {
  const match = token.match(TOKEN_REGEX);
  if (!match) {
    throw new Error("Invalid token format");
  }
  const [, uid, cid, exp, sig] = match as [string, string, string, string, string];
  return { uid, cid, exp: Number(exp), sig };
}

export function verify(token: string, secret: string): { uid: string; cid: string } {
  const { uid, cid, exp, sig } = parseToken(token);
  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${uid}:${cid}:${exp}`)
    .digest("base64url");
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    throw new Error("Invalid signature");
  }
  if (Date.now() / 1000 > exp) {
    throw new Error("Token expired");
  }
  return { uid, cid };
}
