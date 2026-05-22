const valueOrFallback = (value) => value || 'Not provided';

export const adminContactEmailTemplate = (contact) => ({
  subject: 'New contact query from Nexora website',
  html: `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937;max-width:720px;margin:0 auto;padding:24px;">
      <h2 style="color:#0C4B2A;margin-bottom:16px;">New Contact Query</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;"><strong>Full Name</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${valueOrFallback(contact.fullName)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;"><strong>Email</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${valueOrFallback(contact.email)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;"><strong>Phone</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${valueOrFallback(contact.phone)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;"><strong>Company Name</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${valueOrFallback(contact.companyName)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;"><strong>Message</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${valueOrFallback(contact.message)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;"><strong>Submitted At</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${new Date(contact.createdAt).toLocaleString()}</td></tr>
      </table>
    </div>
  `,
});
