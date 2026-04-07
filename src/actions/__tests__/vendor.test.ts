import { describe, it, expect } from 'vitest';

import { vendorFormSchema } from '../../lib/forms/vendor';

const validInput = {
  companyName: 'Partner Corp',
  contactName: 'John Smith',
  email: 'john@partnercorp.com',
  description: 'We provide cloud infrastructure consulting services.',
};

describe('vendor form validation', () => {
  it('accepts valid input', () => {
    const result = vendorFormSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('rejects missing company name', () => {
    const result = vendorFormSchema.safeParse({ ...validInput, companyName: '' });
    expect(result.success).toBe(false);
  });

  it('rejects missing contact name', () => {
    const result = vendorFormSchema.safeParse({ ...validInput, contactName: '' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = vendorFormSchema.safeParse({ ...validInput, email: 'not-valid' });
    expect(result.success).toBe(false);
  });

  it('rejects description under 10 characters', () => {
    const result = vendorFormSchema.safeParse({ ...validInput, description: 'Short' });
    expect(result.success).toBe(false);
  });

  it('treats empty optional fields as undefined', () => {
    const result = vendorFormSchema.safeParse({ ...validInput, phone: '', partnershipType: '' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.phone).toBeUndefined();
      expect(result.data.partnershipType).toBeUndefined();
    }
  });
});
