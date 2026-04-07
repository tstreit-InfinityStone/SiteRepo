import { describe, it, expect } from 'vitest';

import { contactFormSchema } from '../../lib/forms/contact';

const validInput = {
  name: 'Jane Doe',
  organization: 'ACME Corp',
  email: 'jane@example.com',
  message: 'I want to discuss a capability fit for our program.',
};

describe('contact form validation', () => {
  it('accepts valid input', () => {
    const result = contactFormSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('rejects missing name', () => {
    const result = contactFormSchema.safeParse({ ...validInput, name: '' });
    expect(result.success).toBe(false);
  });

  it('rejects name that is too short', () => {
    const result = contactFormSchema.safeParse({ ...validInput, name: 'A' });
    expect(result.success).toBe(false);
  });

  it('rejects missing organization', () => {
    const result = contactFormSchema.safeParse({ ...validInput, organization: '' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = contactFormSchema.safeParse({ ...validInput, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('trims whitespace from email', () => {
    const result = contactFormSchema.safeParse({ ...validInput, email: '  jane@example.com  ' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('jane@example.com');
    }
  });

  it('rejects message under 10 characters', () => {
    const result = contactFormSchema.safeParse({ ...validInput, message: 'Short' });
    expect(result.success).toBe(false);
  });

  it('treats empty optional fields as undefined', () => {
    const result = contactFormSchema.safeParse({ ...validInput, phone: '', capabilityInterest: '' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.phone).toBeUndefined();
      expect(result.data.capabilityInterest).toBeUndefined();
    }
  });
});
