import { z } from 'zod';

import { optionalText, trimmedEmail } from './shared';

export const contactFormSchema = z.object({
  name: z.string().trim().min(2).max(80),
  organization: z.string().trim().min(2).max(120),
  email: trimmedEmail,
  phone: optionalText(40),
  capabilityInterest: optionalText(120),
  message: z
    .string()
    .trim()
    .min(10, 'Please enter at least 10 characters so ISS has enough context.')
    .max(3000),
  company: optionalText(120),
  turnstileToken: optionalText(2048),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
