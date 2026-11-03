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

// A plan button fires this so the Get started flow opens on its recommendation with that plan picked.
export const PLAN_EVENT = "reign:select-plan";
export const selectPlan = (id) => window.dispatchEvent(new CustomEvent(PLAN_EVENT, { detail: id }));

// A service card fires this so the Get started flow opens on its first question with that answer picked.
export const SERVICE_EVENT = "reign:select-service";
export const selectService = (id) => window.dispatchEvent(new CustomEvent(SERVICE_EVENT, { detail: id }));
