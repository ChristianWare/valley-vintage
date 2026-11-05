// src/config/demo.ts
//
// Demo mode — this site is a demo account, so NOTHING is emailed out.
//
//  • Every Resend call (all forms, bookings, invoices, auth, reminders, SMS
//    gateway, admin alerts) goes through src/lib/email/resend.ts, which fakes
//    a successful send instead of contacting Resend.
//  • The SMTP welcome email (nodemailer) is skipped.
//  • Public forms still validate and show success. Corporate inquiries are
//    not saved. New sign-ups are auto-verified since no email can arrive.
//
// ON by default. To send real emails again, set DEMO_FORMS_LIVE=true.
export const DEMO_FORMS_SILENT = process.env.DEMO_FORMS_LIVE !== "true";
