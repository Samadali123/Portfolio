import { ApiError } from './api';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');

const clean = (value: unknown) => escapeHtml(String(value ?? '').trim());
const optionalClean = (value: unknown) => {
  const cleaned = clean(value);
  return cleaned || '';
};

const assertLength = (value: string, min: number, max: number, message: string) => {
  if (value.length < min || value.length > max) {
    throw new ApiError(message, 400);
  }
};

const assertMaxLength = (value: string, max: number, message: string) => {
  if (value && value.length > max) {
    throw new ApiError(message, 400);
  }
};

const assertEmail = (value: string) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    throw new ApiError('Please provide a valid email address.', 400);
  }

  if (value.length > 180) {
    throw new ApiError('Email is too long.', 400);
  }
};

const assertIsoDate = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value))) {
    throw new ApiError('Preferred date must be a valid date.', 400);
  }
};

const assertUrl = (value: string, message: string) => {
  if (!value) return;

  try {
    const url = new URL(value);
    if (!url.protocol.startsWith('http')) throw new Error('Invalid protocol');
  } catch {
    throw new ApiError(message, 400);
  }
};

export const validateContact = (body: Record<string, unknown>) => {
  const name = optionalClean(body.name);
  const fullName = optionalClean(body.fullName);

  if (!name && !fullName) {
    throw new ApiError('Name is required.', 400);
  }

  if (name) assertLength(name, 2, 120, 'Name must be between 2 and 120 characters.');
  if (fullName) assertLength(fullName, 2, 120, 'Full name must be between 2 and 120 characters.');

  const email = clean(body.email).toLowerCase();
  assertEmail(email);

  const phone = optionalClean(body.phone);
  const companyName = optionalClean(body.companyName);
  const message = clean(body.message);

  assertMaxLength(phone, 40, 'Phone number is too long.');
  assertMaxLength(companyName, 160, 'Company name is too long.');
  assertLength(message, 10, 3000, 'Message must be between 10 and 3000 characters.');

  return {
    fullName: fullName || name,
    email,
    phone,
    companyName,
    message,
  };
};

export const validateConsultation = (body: Record<string, unknown>) => {
  const service = optionalClean(body.service);
  const serviceInterestedIn = optionalClean(body.serviceInterestedIn);
  const date = optionalClean(body.date);
  const preferredDate = optionalClean(body.preferredDate);
  const time = optionalClean(body.time);
  const preferredTime = optionalClean(body.preferredTime);

  if (!service && !serviceInterestedIn) throw new ApiError('Service is required.', 400);
  if (!date && !preferredDate) throw new ApiError('Preferred date is required.', 400);
  if (!time && !preferredTime) throw new ApiError('Preferred time is required.', 400);

  if (service) assertLength(service, 2, 120, 'Service must be between 2 and 120 characters.');
  if (serviceInterestedIn) assertLength(serviceInterestedIn, 2, 120, 'Service must be between 2 and 120 characters.');

  const resolvedDate = preferredDate || date;
  assertIsoDate(resolvedDate);

  const resolvedTime = preferredTime || time;
  assertLength(resolvedTime, 2, 40, 'Preferred time must be provided.');

  const email = clean(body.email).toLowerCase();
  assertEmail(email);

  const fullName = optionalClean(body.fullName);
  const phone = optionalClean(body.phone);
  const projectDescription = optionalClean(body.projectDescription);

  assertMaxLength(fullName, 120, 'Full name is too long.');
  assertMaxLength(phone, 40, 'Phone number is too long.');
  assertMaxLength(projectDescription, 3000, 'Project description is too long.');

  return {
    fullName,
    email,
    phone,
    serviceInterestedIn: serviceInterestedIn || service,
    preferredDate: resolvedDate,
    preferredTime: resolvedTime,
    projectDescription,
  };
};

export const validateApplication = (body: Record<string, any>) => {
  const name = clean(body.name);
  assertLength(name, 2, 120, 'Full name must be between 2 and 120 characters.');

  const email = clean(body.email).toLowerCase();
  assertEmail(email);

  const college = clean(body.college);
  const graduationYear = clean(body.graduationYear);
  const role = clean(body.role);
  const experience = clean(body.experience);
  const portfolio = optionalClean(body.portfolio);
  const github = optionalClean(body.github);

  assertLength(college, 2, 180, 'College or university is required.');
  assertLength(graduationYear, 2, 20, 'Graduation year is required.');
  assertLength(role, 2, 120, 'Role is required.');
  assertLength(experience, 1, 80, 'Experience is required.');
  assertUrl(portfolio, 'Portfolio must be a valid URL.');
  assertUrl(github, 'GitHub profile must be a valid URL.');

  const resume = body.resume || {};
  const fileName = clean(resume.fileName);
  const mimeType = clean(resume.mimeType);
  const size = Number(resume.size);
  const base64 = String(resume.base64 || '');

  assertLength(fileName, 1, 220, 'Resume file name is required.');
  if (mimeType !== 'application/pdf') throw new ApiError('Resume must be a PDF file.', 400);
  if (!Number.isInteger(size) || size < 1 || size > 10 * 1024 * 1024) {
    throw new ApiError('Resume must be 10MB or smaller.', 400);
  }
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(base64)) {
    throw new ApiError('Resume content is invalid.', 400);
  }

  return {
    name,
    email,
    college,
    graduationYear,
    role,
    experience,
    portfolio,
    github,
    resume: { fileName, mimeType, size, base64 },
  };
};

export const validateRegisterAdmin = (body: Record<string, unknown>) => {
  const fullName = clean(body.fullName);
  const email = clean(body.email).toLowerCase();
  const password = String(body.password || '');

  assertLength(fullName, 2, 120, 'Full name must be between 2 and 120 characters.');
  assertEmail(email);
  assertLength(password, 8, 128, 'Password must be at least 8 characters.');

  return { fullName, email, password };
};

export const validateLoginAdmin = (body: Record<string, unknown>) => {
  const email = clean(body.email).toLowerCase();
  const password = String(body.password || '');

  assertEmail(email);
  if (!password) throw new ApiError('Password is required.', 400);

  return { email, password };
};

export const validateForgotPassword = (body: Record<string, unknown>) => {
  const email = clean(body.email).toLowerCase();
  assertEmail(email);
  return { email };
};

export const validateResetPassword = (body: Record<string, unknown>) => {
  const token = clean(body.token);
  const password = String(body.password || '');

  if (!token) throw new ApiError('Reset token is required.', 400);
  assertLength(password, 8, 128, 'Password must be at least 8 characters.');

  return { token, password };
};
