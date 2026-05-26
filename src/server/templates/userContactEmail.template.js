export const userContactEmailTemplate = ({ fullName }) => ({
  subject: 'Thank you for contacting ASG Solutionss',
  html: `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937;max-width:640px;margin:0 auto;padding:24px;">
      <h2 style="color:#0C4B2A;margin-bottom:12px;">Thank you for contacting us${fullName ? `, ${fullName}` : ''}.</h2>
      <p>Thank you for contacting us. Our team will get back to you soon.</p>
      <p style="margin-top:24px;">Regards,<br><strong>ASG Solutionss Team</strong></p>
    </div>
  `,
});
