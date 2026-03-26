import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro/zod';

import { sendVendorEmail, verifyTurnstileToken } from '@/lib/contact';

const optionalText = (maxLength: number) =>
  z.preprocess(
    (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
    z.string().trim().max(maxLength).optional(),
  );

const trimmedEmail = z.preprocess(
  (value) => (typeof value === 'string' ? value.trim() : value),
  z.email().max(120),
);

export const vendor = {
  submit: defineAction({
    accept: 'form',
    input: z.object({
      companyName: z.string().trim().min(2).max(120),
      contactName: z.string().trim().min(2).max(80),
      email: trimmedEmail,
      phone: optionalText(40),
      partnershipType: optionalText(120),
      description: z
        .string()
        .trim()
        .min(10, 'Please enter at least 10 characters so we can understand your offering.')
        .max(3000),
      company: optionalText(120),
      turnstileToken: optionalText(2048),
    }),
    handler: async (input) => {
      if (input.company) {
        return { ok: true, skipped: true };
      }

      const verification = await verifyTurnstileToken(input.turnstileToken);

      if (!verification.ok) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: 'Please complete the verification step before submitting the form.',
        });
      }

      try {
        await sendVendorEmail(input);
      } catch (error) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message:
            error instanceof Error
              ? error.message
              : 'The inquiry could not be sent. Please email ISS directly instead.',
        });
      }

      return {
        ok: true,
        submittedAt: new Date().toISOString(),
        email: input.email,
      };
    },
  }),
};
