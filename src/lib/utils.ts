import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cmToIn = (cm: number) => (cm / 2.54).toFixed(1);
export const cmToFeetInches = (cm: number) => {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}'${inches}"`;
};
export const kgToLb = (kg: number) => (kg * 2.20462).toFixed(1);
export const euToUsShoes = (eu: number) => (eu - 30.5).toFixed(1); // approx
export function getAvatarAbbreviation(text: string): string {
  if (!text) return "";

  const words = text.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }

  return words
    .slice(0, 2)
    .map(word => word[0].toUpperCase())
    .join("");
}

export const formatWhatsAppURL = (phone: string, name: string) => {
  const message = `Hello ${name}, I am interested in collaborating with you for a project or job. Could we discuss the details?`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
};
