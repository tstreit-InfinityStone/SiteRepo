import { z } from 'zod';

import { optionalText, trimmedEmail } from './shared';

export const ALLOWED_RESUME_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const MAX_RESUME_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export const careersFormSchema = z.object({
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
    .refine((file) => file.size > 0, 'Please attach a resume.')
    .refine((file) => file.size <= MAX_RESUME_FILE_SIZE, 'File must be under 10 MB.')
    .refine(
      (file) => ALLOWED_RESUME_MIME_TYPES.includes(file.type),
      'Please upload a PDF or Word document.',
    ),
  company: optionalText(120),
  turnstileToken: optionalText(2048),
});

export type CareersFormInput = z.infer<typeof careersFormSchema>;

export async function validateResumeSignature(file: File) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const isPdf =
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46;
  const isDocx =
    bytes[0] === 0x50 &&
    bytes[1] === 0x4b &&
    bytes[2] === 0x03 &&
    bytes[3] === 0x04;
  const isDoc =
    bytes[0] === 0xd0 &&
    bytes[1] === 0xcf &&
    bytes[2] === 0x11 &&
    bytes[3] === 0xe0;

  return isPdf || isDocx || isDoc;
}
