"use server";

import { z } from "zod";
import { contactCopy } from "@/lib/content";
import {
  inquiryFields,
  inquirySchema,
  inquiryValidationMessage,
  type InquiryErrors,
  type InquiryField,
  type InquiryInput,
  type InquiryState,
  type InquiryValues,
} from "@/lib/inquiry-schema";

const WEBHOOK_TIMEOUT_MS = 8000;
const HONEYPOT_FIELD = "website";
const LOG_PREFIX = "[inquiry]";

const failure: InquiryState = { status: "error", message: contactCopy.error };

function readText(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function readValues(formData: FormData): InquiryValues {
  return Object.fromEntries(inquiryFields.map((field) => [field, readText(formData, field)])) as InquiryValues;
}

function firstErrors(fieldErrors: Partial<Record<InquiryField, ReadonlyArray<string>>>): InquiryErrors {
  const entries = inquiryFields.flatMap((field) => {
    const message = fieldErrors[field]?.[0];
    return message ? [[field, message] as const] : [];
  });
  return Object.fromEntries(entries) as InquiryErrors;
}

type InquiryPayload = Omit<InquiryInput, "website"> & { readonly receivedAt: string };

async function deliver(payload: InquiryPayload): Promise<InquiryState> {
  const url = process.env.INQUIRY_WEBHOOK_URL;
  if (!url) {
    console.info(LOG_PREFIX, payload);
    return { status: "success" };
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
    if (!response.ok) {
      console.error(LOG_PREFIX, "webhook responded with", response.status, "for", payload.email);
      return failure;
    }
    return { status: "success" };
  } catch (error) {
    console.error(LOG_PREFIX, "webhook request failed for", payload.email, error);
    return failure;
  }
}

/**
 * Server action for the contact form (used with useActionState). Validates,
 * forwards to the inquiry webhook when configured, otherwise logs. Never throws
 * to the client: every outcome is returned as state.
 */
export async function submitInquiry(_previous: InquiryState, formData: FormData): Promise<InquiryState> {
  try {
    const values = readValues(formData);
    const honeypot = readText(formData, HONEYPOT_FIELD);
    if (honeypot.length > 0) {
      console.warn(LOG_PREFIX, "honeypot filled, submission dropped");
      return { status: "success" };
    }

    const parsed = inquirySchema.safeParse({ ...values, [HONEYPOT_FIELD]: honeypot });
    if (!parsed.success) {
      const { fieldErrors } = z.flattenError(parsed.error);
      return { status: "error", message: inquiryValidationMessage, errors: firstErrors(fieldErrors), values };
    }

    const { name, company, email, phone, interest, message } = parsed.data;
    return await deliver({ name, company, email, phone, interest, message, receivedAt: new Date().toISOString() });
  } catch (error) {
    console.error(LOG_PREFIX, "unexpected failure", error);
    return failure;
  }
}
