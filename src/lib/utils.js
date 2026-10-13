import { OWNER, INSTAGRAM, PHONE } from "../config";

export const isPlaceholder = (v) => !v || /^\[.*\]$/.test(String(v).trim());

export const firstName = OWNER.split(" ")[0];

export const showInstagram = !isPlaceholder(INSTAGRAM);
export const instagramHandle = INSTAGRAM.replace(/^@/, "");
export const instagramUrl = `https://instagram.com/${instagramHandle}`;

// "(754) 277-6110" → "sms:+17542776110" / "tel:+17542776110"
const digits = PHONE.replace(/\D/g, "");
const e164 = `${digits.length === 10 ? "+1" : "+"}${digits}`;
export const smsHref = `sms:${e164}`;
export const telHref = `tel:${e164}`;
