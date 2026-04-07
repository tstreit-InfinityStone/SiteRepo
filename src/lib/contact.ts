import { Resend } from 'resend';

const turnstileVerifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

type InquiryInput = {
  name: string;
  organization: string;
  email: string;
  phone?: string;
  capabilityInterest?: string;
  message: string;
};

type VendorInput = {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  partnershipType?: string;
  description: string;
};

type CareersInput = {
  fullName: string;
  email: string;
  phone?: string;
  areaOfInterest?: string;
  message: string;
  resumeFilename: string;
  resumeContent: Buffer;
};

export async function verifyTurnstileToken(token: string | undefined) {
  const secret = import.meta.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return { ok: true, skipped: true };
  }

  if (!token) {
    return { ok: false, skipped: false };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(turnstileVerifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    const result = await response.json() as { success?: boolean };
    return { ok: Boolean(result.success), skipped: false };
  } catch {
    clearTimeout(timeout);
    return { ok: false, skipped: false };
  }
}

export async function sendInquiryEmail(input: InquiryInput) {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const from = import.meta.env.CONTACT_FROM_ADDRESS;
  const to = import.meta.env.CONTACT_TO_ADDRESS || 'info@infinitystonesolutions.com';

  if (!apiKey || !from) {
    throw new Error('Contact form email settings are not configured.');
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo: input.email,
    subject: `ISS website inquiry from ${input.name}`,
    text: [
      `Name: ${input.name}`,
      `Organization: ${input.organization}`,
      `Email: ${input.email}`,
      `Phone: ${input.phone || 'Not provided'}`,
      `Capability interest: ${input.capabilityInterest || 'Not specified'}`,
      '',
      input.message,
    ].join('\n'),
    html: `
      <h1>New ISS website inquiry</h1>
      <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
      <p><strong>Organization:</strong> ${escapeHtml(input.organization)}</p>
      <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(input.phone || 'Not provided')}</p>
      <p><strong>Capability interest:</strong> ${escapeHtml(input.capabilityInterest || 'Not specified')}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(input.message).replace(/\n/g, '<br />')}</p>
    `,
  });

  if (error) {
    throw new Error(`Resend rejected the email: ${error.message}`);
  }

  if (!data?.id) {
    throw new Error('Resend did not confirm an email ID for this inquiry.');
  }
}

export async function sendVendorEmail(input: VendorInput) {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const from = import.meta.env.CONTACT_FROM_ADDRESS;
  const to = import.meta.env.CONTACT_TO_ADDRESS || 'info@infinitystonesolutions.com';

  if (!apiKey || !from) {
    throw new Error('Contact form email settings are not configured.');
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo: input.email,
    subject: `ISS vendor/partner inquiry from ${input.companyName}`,
    text: [
      `Company: ${input.companyName}`,
      `Contact: ${input.contactName}`,
      `Email: ${input.email}`,
      `Phone: ${input.phone || 'Not provided'}`,
      `Partnership type: ${input.partnershipType || 'Not specified'}`,
      '',
      input.description,
    ].join('\n'),
    html: `
      <h1>New vendor/partner inquiry</h1>
      <p><strong>Company:</strong> ${escapeHtml(input.companyName)}</p>
      <p><strong>Contact:</strong> ${escapeHtml(input.contactName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(input.phone || 'Not provided')}</p>
      <p><strong>Partnership type:</strong> ${escapeHtml(input.partnershipType || 'Not specified')}</p>
      <p><strong>Description:</strong></p>
      <p>${escapeHtml(input.description).replace(/\n/g, '<br />')}</p>
    `,
  });

  if (error) {
    throw new Error(`Resend rejected the email: ${error.message}`);
  }

  if (!data?.id) {
    throw new Error('Resend did not confirm an email ID for this inquiry.');
  }
}

export async function sendCareersEmail(input: CareersInput) {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const from = import.meta.env.CONTACT_FROM_ADDRESS;
  const to = import.meta.env.CONTACT_TO_ADDRESS || 'info@infinitystonesolutions.com';

  if (!apiKey || !from) {
    throw new Error('Contact form email settings are not configured.');
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo: input.email,
    subject: `ISS careers inquiry from ${input.fullName}`,
    text: [
      `Name: ${input.fullName}`,
      `Email: ${input.email}`,
      `Phone: ${input.phone || 'Not provided'}`,
      `Area of interest: ${input.areaOfInterest || 'Not specified'}`,
      '',
      input.message,
    ].join('\n'),
    html: `
      <h1>New careers inquiry</h1>
      <p><strong>Name:</strong> ${escapeHtml(input.fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(input.phone || 'Not provided')}</p>
      <p><strong>Area of interest:</strong> ${escapeHtml(input.areaOfInterest || 'Not specified')}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(input.message).replace(/\n/g, '<br />')}</p>
      <p><em>Resume attached: ${escapeHtml(input.resumeFilename)}</em></p>
    `,
    attachments: [
      {
        filename: input.resumeFilename,
        content: input.resumeContent,
      },
    ],
  });

  if (error) {
    throw new Error(`Resend rejected the email: ${error.message}`);
  }

  if (!data?.id) {
    throw new Error('Resend did not confirm an email ID for this inquiry.');
  }
}

export function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
