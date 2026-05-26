const valueOrFallback = (value) => value || 'Not provided';

export const adminConsultationEmailTemplate = (consultation) => ({
  subject: 'New consultation booking from ASG Solutions website',
  html: `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937;max-width:720px;margin:0 auto;padding:24px;">
      <h2 style="color:#0C4B2A;margin-bottom:16px;">New Consultation Booking</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;"><strong>Full Name</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${valueOrFallback(consultation.fullName)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;"><strong>Email</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${valueOrFallback(consultation.email)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;"><strong>Phone</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${valueOrFallback(consultation.phone)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;"><strong>Service Interested In</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${valueOrFallback(consultation.serviceInterestedIn)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;"><strong>Preferred Date</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${valueOrFallback(consultation.preferredDate)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;"><strong>Preferred Time</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${valueOrFallback(consultation.preferredTime)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;"><strong>Project Description</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${valueOrFallback(consultation.projectDescription)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;"><strong>Submitted At</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${new Date(consultation.createdAt).toLocaleString()}</td></tr>
      </table>
    </div>
  `,
});
