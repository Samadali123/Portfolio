import nodemailer from 'nodemailer';
import { env } from './env';
import { adminApplicationEmailTemplate } from './templates/adminApplicationEmail.template.js';
import { adminContactEmailTemplate } from './templates/adminContactEmail.template.js';
import { adminConsultationEmailTemplate } from './templates/adminConsultationEmail.template.js';
import { adminPasswordResetEmailTemplate } from './templates/adminPasswordResetEmail.template.js';
import { userApplicationEmailTemplate } from './templates/userApplicationEmail.template.js';
import { userContactEmailTemplate } from './templates/userContactEmail.template.js';
import { userConsultationEmailTemplate } from './templates/userConsultationEmail.template.js';

const transporter = nodemailer.createTransport({
  host: env.mail.host,
  port: env.mail.port,
  secure: env.mail.secure,
  auth: {
    user: env.mail.user,
    pass: env.mail.pass,
  },
});

const sendMail = async ({ to, subject, html, replyTo, attachments }: any) => {
  return transporter.sendMail({
    from: `"ASG Solutionss" <${env.mail.user}>`,
    to,
    subject,
    html,
    replyTo,
    attachments,
  });
};

export const sendContactEmails = async (contact: any) => {
  const userEmail = userContactEmailTemplate(contact);
  const adminEmail = adminContactEmailTemplate(contact);

  await Promise.all([
    sendMail({ to: contact.email, ...userEmail }),
    sendMail({ to: env.companyEmail, replyTo: contact.email, ...adminEmail }),
  ]);
};

export const sendConsultationEmails = async (consultation: any) => {
  const userEmail = userConsultationEmailTemplate(consultation);
  const adminEmail = adminConsultationEmailTemplate(consultation);

  await Promise.all([
    sendMail({ to: consultation.email, ...userEmail }),
    sendMail({ to: env.companyEmail, replyTo: consultation.email, ...adminEmail }),
  ]);
};

export const sendApplicationEmails = async (application: any) => {
  const userEmail = userApplicationEmailTemplate(application);
  const adminEmail = adminApplicationEmailTemplate(application);

  await Promise.all([
    sendMail({ to: application.email, ...userEmail }),
    sendMail({
      to: env.companyEmail,
      replyTo: application.email,
      attachments: [
        {
          filename: application.resume.fileName,
          content: application.resume.data,
          contentType: application.resume.mimeType,
        },
      ],
      ...adminEmail,
    }),
  ]);
};

export const sendAdminPasswordResetEmail = async ({ email, resetUrl }: { email: string; resetUrl: string }) => {
  const resetEmail = adminPasswordResetEmailTemplate({ resetUrl });

  await sendMail({
    to: email,
    ...resetEmail,
  });
};
