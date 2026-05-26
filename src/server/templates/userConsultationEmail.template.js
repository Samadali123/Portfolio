export const userConsultationEmailTemplate = ({ serviceInterestedIn, preferredDate, preferredTime }) => ({
  subject: 'Your consultation request has been received',
  html: `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937;max-width:640px;margin:0 auto;padding:24px;">
      <h2 style="color:#0C4B2A;margin-bottom:12px;">Consultation request received</h2>
      <p>Your consultation request has been received. Our team will contact you soon.</p>
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin-top:20px;">
        <p style="margin:0;"><strong>Service:</strong> ${serviceInterestedIn}</p>
        <p style="margin:8px 0 0;"><strong>Preferred Date:</strong> ${preferredDate}</p>
        <p style="margin:8px 0 0;"><strong>Preferred Time:</strong> ${preferredTime}</p>
      </div>
      <p style="margin-top:24px;">Regards,<br><strong>ASG Solutionss Team</strong></p>
    </div>
  `,
});
