import { describe, it, expect } from 'vitest';

import {
  careersFormSchema,
  MAX_RESUME_FILE_SIZE,
  validateResumeSignature,
} from '../../lib/forms/careers';

function makeFile(name: string, size: number, type: string): File {
  const content = new Uint8Array(size);
  return new File([content], name, { type });
}

const validInput = {
  fullName: 'Tyler Streit',
  email: 'tyler@example.com',
  message: 'I have experience in federal IT modernization.',
  resume: makeFile('resume.pdf', 1024, 'application/pdf'),
};

describe('careers form validation', () => {
  it('accepts valid input', () => {
    const result = careersFormSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('rejects empty resume file', () => {
    const result = careersFormSchema.safeParse({
      ...validInput,
      resume: makeFile('empty.pdf', 0, 'application/pdf'),
    });
    expect(result.success).toBe(false);
  });

  it('rejects file over 10 MB', () => {
    const result = careersFormSchema.safeParse({
      ...validInput,
      resume: makeFile('huge.pdf', MAX_RESUME_FILE_SIZE + 1, 'application/pdf'),
    });
    expect(result.success).toBe(false);
  });

  it('rejects non-PDF/Word file types', () => {
    const result = careersFormSchema.safeParse({
      ...validInput,
      resume: makeFile('image.png', 1024, 'image/png'),
    });
    expect(result.success).toBe(false);
  });

  it('accepts DOCX files', () => {
    const result = careersFormSchema.safeParse({
      ...validInput,
      resume: makeFile('resume.docx', 1024, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
    });
    expect(result.success).toBe(true);
  });

  it('rejects name that is too short', () => {
    const result = careersFormSchema.safeParse({ ...validInput, fullName: 'A' });
    expect(result.success).toBe(false);
  });

  it('rejects message under 10 characters', () => {
    const result = careersFormSchema.safeParse({ ...validInput, message: 'Short' });
    expect(result.success).toBe(false);
  });

  it('rejects resume content with an invalid file signature', async () => {
    const result = await validateResumeSignature(
      makeFile('resume.pdf', 1024, 'application/pdf'),
    );
    expect(result).toBe(false);
  });

  it('accepts a valid PDF signature', async () => {
    const pdfFile = new File([Uint8Array.from([0x25, 0x50, 0x44, 0x46])], 'resume.pdf', {
      type: 'application/pdf',
    });

    const result = await validateResumeSignature(pdfFile);
    expect(result).toBe(true);
  });
});
