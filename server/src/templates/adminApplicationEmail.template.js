const valueOrFallback = (value) => value || 'Not provided';

export const adminApplicationEmailTemplate = (application) => ({
  subject: 'New talent pool application from Nexora website',
  html: `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937;max-width:720px;margin:0 auto;padding:24px;">
      <h2 style="color:#0C4B2A;margin-bottom:16px;">New Talent Pool Application</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;"><strong>Full Name</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${valueOrFallback(application.fullName)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;"><strong>Email</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${valueOrFallback(application.email)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;"><strong>College</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${valueOrFallback(application.college)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;"><strong>Graduation Year</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${valueOrFallback(application.graduationYear)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;"><strong>Role</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${valueOrFallback(application.role)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;"><strong>Experience</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${valueOrFallback(application.experience)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;"><strong>Portfolio</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${valueOrFallback(application.portfolio)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;"><strong>GitHub</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${valueOrFallback(application.github)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;"><strong>Resume</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${valueOrFallback(application.resume?.fileName)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;"><strong>Submitted At</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${new Date(application.createdAt).toLocaleString()}</td></tr>
      </table>
    </div>
  `,
});
