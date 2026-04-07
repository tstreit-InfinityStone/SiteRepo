import { z, type ZodError } from 'zod';

export type FormFieldErrors = Record<string, string[]>;

export const optionalText = (maxLength: number) =>
  z.preprocess(
    (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
    z.string().trim().max(maxLength).optional(),
  );

export const trimmedEmail = z.preprocess(
  (value) => (typeof value === 'string' ? value.trim() : value),
  z.email().max(120),
);

export function toFieldErrors(error: ZodError): FormFieldErrors | undefined {
  const flattenedErrors = error.flatten().fieldErrors as Record<string, string[] | undefined>;
  const fieldErrors = Object.entries(flattenedErrors).reduce<FormFieldErrors>(
    (accumulator, [field, messages]) => {
      if (!Array.isArray(messages) || messages.length === 0) return accumulator;
      accumulator[field] = messages;
      return accumulator;
    },
    {},
  );

  return Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined;
}

export function jsonSuccessResponse(payload: Record<string, unknown> = {}) {
  return Response.json({
    ok: true,
    submittedAt: new Date().toISOString(),
    ...payload,
  });
}

export function jsonErrorResponse(
  status: number,
  formError?: string,
  fieldErrors?: FormFieldErrors,
) {
  return Response.json(
    {
      ok: false,
      ...(formError ? { formError } : {}),
      ...(fieldErrors ? { fieldErrors } : {}),
    },
    { status },
  );
}

export function jsonValidationErrorResponse(error: ZodError, formError?: string) {
  return jsonErrorResponse(400, formError, toFieldErrors(error));
}

export function getRequestIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  return (
    request.headers.get('cf-connecting-ip') ||
    forwardedFor?.split(',')[0]?.trim() ||
    'unknown'
  );
}

export async function getFormPayload(request: Request) {
  const formData = await request.formData();
  return Object.fromEntries(formData.entries());
}
