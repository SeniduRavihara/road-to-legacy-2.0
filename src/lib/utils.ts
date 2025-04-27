import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createEmailHTML = (name: string, downloadUrl: string) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Hello ${name},</h2>
      <p>Thank you for registering! Here's your event invitation:</p>

      <img 
        src="${downloadUrl}" 
        alt="Your Ticket" 
        style="width: 100%; max-width: 400px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" 
      />

      <p>
        <a 
          href="${downloadUrl}" 
          style="display: inline-block; margin-top: 16px; background-color: #4CAF50; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none;"
        >
          Download Your Ticket
        </a>
      </p>
    </div>
  `;
};

