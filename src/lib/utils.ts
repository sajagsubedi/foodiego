import { format } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatDate(date: string): string {
  if (!date) return "N/A";
  return format(new Date(date), "MMM dd, yyyy");
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NPR",
  }).format(amount);
}
export const truncateDescription = (
  description: string,
  maxLength: number
): string => {
  if (description.length <= maxLength) {
    return description;
  }
  return description.substring(0, maxLength - 3) + "...";
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
