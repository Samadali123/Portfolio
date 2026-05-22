export const userApplicationEmailTemplate = ({ fullName, role }) => ({
  subject: 'Your Nexora application has been received',
  html: `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937;max-width:640px;margin:0 auto;padding:24px;">
      <h2 style="color:#0C4B2A;margin-bottom:12px;">Application received${fullName ? `, ${fullName}` : ''}</h2>
      <p>Thank you for showing interest in Nexora Solution. We have received your talent pool application for <strong>${role}</strong>.</p>
      <p>Our team will review your profile and contact you if a matching position opens up.</p>
      <p style="margin-top:24px;">Regards,<br><strong>Nexora Solutions Team</strong></p>
    </div>
  `,
});
