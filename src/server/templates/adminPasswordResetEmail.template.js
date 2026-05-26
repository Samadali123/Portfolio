export const adminPasswordResetEmailTemplate = ({ resetUrl }) => ({
  subject: 'Reset your ASG Solutions admin password',
  html: `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937;max-width:640px;margin:0 auto;padding:24px;">
      <h2 style="color:#0C4B2A;margin-bottom:12px;">Reset your admin password</h2>
      <p>We received a request to reset your ASG Solutions admin dashboard password.</p>
      <p><a href="${resetUrl}" style="display:inline-block;background:#0A5737;color:#ffffff;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:bold;">Reset Password</a></p>
      <p>This link will expire in 30 minutes. If you did not request this, you can ignore this email.</p>
    </div>
  `,
});
