import { INSTAGRAM, PHONE } from "../config";

export const isPlaceholder = (v) => !v || /^\[.*\]$/.test(String(v).trim());

export const showInstagram = !isPlaceholder(INSTAGRAM);
export const instagramHandle = INSTAGRAM.replace(/^@/, "");
export const instagramUrl = `https://instagram.com/${instagramHandle}`;

// "(754) 277-6110" → "tel:+17542776110"
const digits = PHONE.replace(/\D/g, "");
const e164 = `${digits.length === 10 ? "+1" : "+"}${digits}`;
export const telHref = `tel:${e164}`;

// A pricing card's button fires this so the contact form pre-selects that project type.
export const PROJECT_EVENT = "hor:select-project";
export const selectProject = (project) => window.dispatchEvent(new CustomEvent(PROJECT_EVENT, { detail: project }));
