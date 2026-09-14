import { z } from "zod";
import { contactCopy } from "@/lib/content";

/** Field names shared by the form markup, the schema and the action result. */
export const inquiryFields = ["name", "company", "email", "phone", "interest", "message"] as const;
export type InquiryField = (typeof inquiryFields)[number];

export const inquiryLimits = {
  name: { min: 2, max: 80 },
  company: { min: 2, max: 120 },
  phone: { max: 30 },
  message: { max: 2000 },
} as const;

const messages = {
  name: `Enter your full name, ${inquiryLimits.name.min} to ${inquiryLimits.name.max} characters.`,
  company: `Enter your company name, ${inquiryLimits.company.min} to ${inquiryLimits.company.max} characters.`,
  email: "Enter a valid email address.",
  phone: `Phone numbers can be up to ${inquiryLimits.phone.max} characters.`,
  interest: "Choose a service.",
  message: `Keep the message under ${inquiryLimits.message.max} characters.`,
  honeypot: "Leave this field empty.",
} as const;

/** Validation for a contact inquiry. The honeypot must stay empty. */
export const inquirySchema = z.object({
  name: z.string().trim().min(inquiryLimits.name.min, messages.name).max(inquiryLimits.name.max, messages.name),
  company: z
    .string()
    .trim()
    .min(inquiryLimits.company.min, messages.company)
    .max(inquiryLimits.company.max, messages.company),
  email: z.email(messages.email),
  phone: z.string().trim().max(inquiryLimits.phone.max, messages.phone),
  interest: z.enum(contactCopy.interests, { message: messages.interest }),
  message: z.string().trim().max(inquiryLimits.message.max, messages.message),
  website: z.string().max(0, messages.honeypot),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

/** Raw values as typed by the visitor, echoed back so a failed submit keeps them. */
export type InquiryValues = Partial<Record<InquiryField, string>>;
export type InquiryErrors = Partial<Record<InquiryField, string>>;

export type InquiryState =
  | { readonly status: "idle" }
  | { readonly status: "success" }
  | {
      readonly status: "error";
      readonly message: string;
      readonly errors?: InquiryErrors;
      readonly values?: InquiryValues;
    };

export const inquiryValidationMessage = "Please check the highlighted fields and try again.";
