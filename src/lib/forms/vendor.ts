import { z } from 'zod';

import { optionalText, trimmedEmail } from './shared';

export const vendorFormSchema = z.object({
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
});

export type VendorFormInput = z.infer<typeof vendorFormSchema>;
