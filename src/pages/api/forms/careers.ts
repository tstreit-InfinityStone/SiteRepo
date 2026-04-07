import type { APIRoute } from 'astro';

import { sendCareersEmail, verifyTurnstileToken } from '@/lib/contact';
import {
  careersFormSchema,
  validateResumeSignature,
} from '@/lib/forms/careers';
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
  const parsed = careersFormSchema.safeParse(payload);

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

  const hasValidSignature = await validateResumeSignature(input.resume);
  if (!hasValidSignature) {
    return jsonErrorResponse(
      400,
      undefined,
      { resume: ['The uploaded file does not appear to be a valid PDF or Word document.'] },
    );
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
    console.error('Careers form submission failed:', error);
    await captureException(error);
    return jsonErrorResponse(
      500,
      'The form could not be submitted. Please try again or email ISS directly.',
    );
  }

  return jsonSuccessResponse({ email: input.email });
};
