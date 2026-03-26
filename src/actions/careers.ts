import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro/zod';

import { sendCareersEmail, verifyTurnstileToken } from '@/lib/contact';

const optionalText = (maxLength: number) =>
  z.preprocess(
    (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
    z.string().trim().max(maxLength).optional(),
  );

const trimmedEmail = z.preprocess(
  (value) => (typeof value === 'string' ? value.trim() : value),
  z.email().max(120),
);

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export const careers = {
  submit: defineAction({
    accept: 'form',
    input: z.object({
      fullName: z.string().trim().min(2).max(80),
      email: trimmedEmail,
      phone: optionalText(40),
      areaOfInterest: optionalText(120),
      message: z
        .string()
        .trim()
        .min(10, 'Please enter at least 10 characters so we can learn about you.')
        .max(3000),
      resume: z
        .instanceof(File)
        .refine((f) => f.size > 0, 'Please attach a resume.')
        .refine((f) => f.size <= MAX_FILE_SIZE, 'File must be under 5 MB.')
        .refine((f) => ALLOWED_MIME_TYPES.includes(f.type), 'Please upload a PDF or Word document.'),
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
        const resumeContent = Buffer.from(await input.resume.arrayBuffer());

        await sendCareersEmail({
          fullName: input.fullName,
          email: input.email,
          phone: input.phone,
          areaOfInterest: input.areaOfInterest,
          message: input.message,
          resumeFilename: input.resume.name,
          resumeContent,
        });
      } catch (error) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message:
            error instanceof Error
              ? error.message
              : 'The application could not be sent. Please email ISS directly instead.',
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
