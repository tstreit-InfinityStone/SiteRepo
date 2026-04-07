import type { APIRoute } from 'astro';

import { sendInquiryEmail, verifyTurnstileToken } from '@/lib/contact';
import { contactFormSchema } from '@/lib/forms/contact';
import {
  getFormPayload,
  getRequestIp,
  jsonErrorResponse,
  jsonSuccessResponse,
  jsonValidationErrorResponse,
} from '@/lib/forms/shared';
import { checkRateLimit } from '@/lib/rate-limit';
import { captureException } from '@/lib/sentry';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const payload = await getFormPayload(request);
  const parsed = contactFormSchema.safeParse(payload);

  if (!parsed.success) {
    return jsonValidationErrorResponse(parsed.error);
  }

  const input = parsed.data;

  if (input.company) {
    return jsonSuccessResponse({ message: 'Submission received.' });
  }

  if (!checkRateLimit(getRequestIp(request)).allowed) {
    return jsonErrorResponse(429, 'Too many submissions. Please wait a moment before trying again.');
  }

  const verification = await verifyTurnstileToken(input.turnstileToken);
  if (!verification.ok) {
    return jsonErrorResponse(400, 'Please complete the verification step before submitting the form.');
  }

  try {
    await sendInquiryEmail(input);
  } catch (error) {
    console.error('Contact form submission failed:', error);
    await captureException(error);
    return jsonErrorResponse(
      500,
      'The form could not be submitted. Please try again or email ISS directly.',
    );
  }

  return jsonSuccessResponse({ email: input.email });
};
