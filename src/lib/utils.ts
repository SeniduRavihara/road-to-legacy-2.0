import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createEmailHTML = (name: string, confirmationUrl: string) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1f2227; border-radius: 12px; overflow: hidden; color: #ffffff; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3); border: 1px solid #333842;">
      <!-- Header -->
      <div style="padding: 25px 30px; text-align: center; background: linear-gradient(to right, #262930, #2c3039); border-bottom: 1px solid #333842;">
        <h1 style="margin: 0; font-size: 28px; font-weight: bold; background: linear-gradient(to right, #40ffaa, #4079ff, #40ffaa); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">ROAD TO LEGACY 2.0</h1>
        <p style="margin: 5px 0 0; font-size: 14px; color: #cccccc; font-style: italic;">EVENT CONFIRMATION</p>
      </div>
      
      <!-- Content -->
      <div style="padding: 30px 35px;">
        <h2 style="margin: 0 0 15px; color: #ffffff; font-size: 22px;">Hello ${name},</h2>
        <p style="margin: 0 0 20px; line-height: 1.6; color: #cccccc;">Thank you for registering for <strong style="color: #ffffff;">Road To Legacy 2.0</strong>. We're excited to have you join us for this special event!</p>
        <p style="margin: 0 0 25px; line-height: 1.6; color: #cccccc;">Please confirm your attendance by clicking the button below:</p>
        
        <!-- Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="${confirmationUrl}" style="display: inline-block; background: linear-gradient(to right, #40ffaa, #4079ff); color: #ffffff; font-weight: bold; padding: 14px 30px; border-radius: 8px; text-decoration: none; font-size: 16px; transition: all 0.3s ease;">CONFIRM ATTENDANCE</a>
        </div>
        
        <p style="margin: 30px 0 0; line-height: 1.5; color: #999999; font-size: 14px;">After confirming your attendance, you will be able to download your ticket immediately. We look forward to seeing you at the event!</p>
      </div>
      
      <!-- Footer -->
      <div style="padding: 20px; text-align: center; background-color: #262930; border-top: 1px solid #333842;">
        <p style="margin: 0; color: #777777; font-size: 14px;">If you have any questions, please contact us at <a href="mailto:itlegacy.team@gmail.com" style="color: #4079ff; text-decoration: none;">itlegacy.team@gmail.com</a></p>
      </div>
    </div>
  `;
};