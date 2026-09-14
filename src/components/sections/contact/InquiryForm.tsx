"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CircleAlert, LoaderCircle } from "lucide-react";
import { useActionState, useState } from "react";
import { submitInquiry } from "@/app/actions/inquiry";
import { FormField } from "@/components/sections/contact/FormField";
import { InquirySuccess } from "@/components/sections/contact/InquirySuccess";
import { Button } from "@/components/ui/Button";
import { contactCopy } from "@/lib/content";
import type { InquiryErrors, InquiryState, InquiryValues } from "@/lib/inquiry-schema";
import { ease } from "@/lib/motion";

const idle: InquiryState = { status: "idle" };
const noErrors: InquiryErrors = {};
const noValues: InquiryValues = {};

const labels = {
  name: "Full name",
  company: "Company",
  email: "Email",
  phone: "Phone",
  interest: "Service interest",
  message: "What are you managing in-house today?",
} as const;

const placeholders = {
  name: "Your name",
  company: "Company or organisation",
  email: "you@company.com",
  phone: "+92 300 0000000",
  interest: "Choose a service",
  message: "Roles, sites, headcount, or the issue you keep chasing.",
} as const;

const REPLY_NOTE = "We reply within one working day.";

/** Contact form driven by the submitInquiry server action. */
export function InquiryForm() {
  const reduce = useReducedMotion();
  const [state, formAction, pending] = useActionState(submitInquiry, idle);
  const [dismissed, setDismissed] = useState<InquiryState | null>(null);

  const showSuccess = state.status === "success" && state !== dismissed;
  const errors = state.status === "error" ? (state.errors ?? noErrors) : noErrors;
  const values = state.status === "error" ? (state.values ?? noValues) : noValues;
  const banner = state.status === "error" ? state.message : null;
  const swap = reduce ? { duration: 0 } : { duration: 0.4, ease: ease.out };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {showSuccess ? (
        <motion.div
          key="success"
          className="flex h-full flex-col"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={swap}
        >
          <InquirySuccess onReset={() => setDismissed(state)} />
        </motion.div>
      ) : (
        <motion.form
          key="form"
          action={formAction}
          noValidate
          className="flex h-full flex-col"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={swap}
        >
          <div className="grid flex-1 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-rows-[auto_auto_auto_minmax(0,1fr)]">
            <FormField name="name" label={labels.name} required autoComplete="name" placeholder={placeholders.name} error={errors.name} defaultValue={values.name} />
            <FormField name="company" label={labels.company} required autoComplete="organization" placeholder={placeholders.company} error={errors.company} defaultValue={values.company} />
            <FormField name="email" label={labels.email} type="email" required autoComplete="email" placeholder={placeholders.email} error={errors.email} defaultValue={values.email} />
            <FormField name="phone" label={labels.phone} type="tel" autoComplete="tel" placeholder={placeholders.phone} error={errors.phone} defaultValue={values.phone} />
            <FormField
              kind="select"
              name="interest"
              label={labels.interest}
              required
              options={contactCopy.interests}
              placeholder={placeholders.interest}
              error={errors.interest}
              defaultValue={values.interest}
              className="md:col-span-2"
            />
            <FormField
              kind="textarea"
              name="message"
              label={labels.message}
              rows={4}
              placeholder={placeholders.message}
              error={errors.message}
              defaultValue={values.message}
              className="md:col-span-2"
            />
          </div>

          {/* Honeypot: hidden from people, tempting to bots. */}
          <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </div>

          <div aria-live="polite" className="mt-5 empty:hidden">
            {banner ? (
              <p className="flex items-start gap-2.5 rounded-2xl border border-[#fecdca] bg-[#fef3f2] px-4 py-3 text-small font-medium text-[#b42318]">
                <CircleAlert aria-hidden="true" className="mt-0.5 size-[18px] shrink-0" strokeWidth={1.75} />
                <span>{banner}</span>
              </p>
            ) : null}
          </div>

          <Button type="submit" size="lg" arrow={!pending} disabled={pending} className="mt-6 w-full">
            {pending ? (
              <>
                <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
                {contactCopy.pending}
              </>
            ) : (
              contactCopy.submit
            )}
          </Button>
          <p className="text-caption mt-3 text-center text-ink-3">{REPLY_NOTE}</p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
