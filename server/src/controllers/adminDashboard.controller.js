import { prisma } from '../config/db.js';
import { successResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const DATE_RANGES = {
  'last-24-hours': { label: 'Last 24 hours', days: 1 },
  'last-week': { label: 'Last week', days: 7 },
  'last-month': { label: 'Last month', days: 30 },
  'last-year': { label: 'Last year', days: 365 },
};

const applicationListSelect = {
  id: true,
  fullName: true,
  email: true,
  college: true,
  graduationYear: true,
  role: true,
  experience: true,
  portfolio: true,
  github: true,
  resumeFileName: true,
  resumeMimeType: true,
  resumeSize: true,
  status: true,
  source: true,
  createdAt: true,
  updatedAt: true,
};

const getRangeConfig = (range = 'last-month') => DATE_RANGES[range] || DATE_RANGES['last-month'];

const getDateRange = (range) => {
  const config = getRangeConfig(range);
  const end = new Date();
  const start = new Date(end);
  start.setDate(start.getDate() - config.days);

  const previousStart = new Date(start);
  previousStart.setDate(previousStart.getDate() - config.days);

  return { ...config, start, end, previousStart };
};

const getDateWhere = (start, end) => ({
  createdAt: {
    gte: start,
    lte: end,
  },
});

const toApiRecord = (record) => ({
  ...record,
  _id: record.id,
});

const toApiApplication = (application) => ({
  ...toApiRecord(application),
  resume: {
    fileName: application.resumeFileName,
    mimeType: application.resumeMimeType,
    size: application.resumeSize,
  },
});

const getTrendLabel = (date, days) => {
  const formatter =
    days <= 1
      ? new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit', hour12: false })
      : days <= 31
        ? new Intl.DateTimeFormat('en', { day: '2-digit', month: 'short' })
        : new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' });

  return formatter.format(new Date(date)).replace('24:00', '00:00');
};

const buildTrend = async (delegate, where, days) => {
  const rows = await delegate.findMany({
    where,
    select: { createdAt: true },
    orderBy: { createdAt: 'asc' },
  });

  const counts = rows.reduce((acc, row) => {
    const label = getTrendLabel(row.createdAt, days);
    acc.set(label, (acc.get(label) || 0) + 1);
    return acc;
  }, new Map());

  return [...counts.entries()].map(([label, count]) => ({ label, count }));
};

const buildTopBreakdown = async (delegate, where, field, fallbackLabel) => {
  const rows = await delegate.groupBy({
    by: [field],
    where,
    _count: { _all: true },
  });

  return rows
    .map((item) => ({
      name: item[field] || fallbackLabel,
      value: item._count._all,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);
};

export const getAdminOverview = asyncHandler(async (req, res) => {
  const range = getDateRange(req.query.range);
  const where = getDateWhere(range.start, range.end);
  const previousWhere = getDateWhere(range.previousStart, range.start);

  const [
    messages,
    appointments,
    applications,
    previousMessages,
    previousAppointments,
    previousApplications,
    messageTrend,
    appointmentTrend,
    applicationTrend,
    serviceBreakdown,
    roleBreakdown,
    latestMessages,
    latestAppointments,
    latestApplications,
  ] = await Promise.all([
    prisma.contact.count({ where }),
    prisma.consultation.count({ where }),
    prisma.application.count({ where }),
    prisma.contact.count({ where: previousWhere }),
    prisma.consultation.count({ where: previousWhere }),
    prisma.application.count({ where: previousWhere }),
    buildTrend(prisma.contact, where, range.days),
    buildTrend(prisma.consultation, where, range.days),
    buildTrend(prisma.application, where, range.days),
    buildTopBreakdown(prisma.consultation, where, 'serviceInterestedIn', 'Unspecified service'),
    buildTopBreakdown(prisma.application, where, 'role', 'Unspecified role'),
    prisma.contact.findMany({ where, orderBy: { createdAt: 'desc' }, take: 5 }),
    prisma.consultation.findMany({ where, orderBy: { createdAt: 'desc' }, take: 5 }),
    prisma.application.findMany({ where, select: applicationListSelect, orderBy: { createdAt: 'desc' }, take: 5 }),
  ]);

  return successResponse(res, 'Dashboard overview fetched successfully', {
    range: {
      label: range.label,
      start: range.start,
      end: range.end,
    },
    totals: { messages, appointments, applications },
    previousTotals: {
      messages: previousMessages,
      appointments: previousAppointments,
      applications: previousApplications,
    },
    salesReport: {
      totalLeads: messages + appointments,
      consultationRequests: appointments,
      hiringApplications: applications,
      consultationRate: messages ? Math.round((appointments / messages) * 100) : appointments ? 100 : 0,
      trend: {
        messages: messageTrend,
        appointments: appointmentTrend,
        applications: applicationTrend,
      },
      serviceBreakdown,
      roleBreakdown,
    },
    latest: {
      messages: latestMessages.map(toApiRecord),
      appointments: latestAppointments.map(toApiRecord),
      applications: latestApplications.map(toApiApplication),
    },
  });
});

export const getAdminMessages = asyncHandler(async (req, res) => {
  const range = getDateRange(req.query.range);
  const messages = await prisma.contact.findMany({
    where: getDateWhere(range.start, range.end),
    orderBy: { createdAt: 'desc' },
  });

  return successResponse(res, 'Messages fetched successfully', { messages: messages.map(toApiRecord) });
});

export const getAdminAppointments = asyncHandler(async (req, res) => {
  const range = getDateRange(req.query.range);
  const appointments = await prisma.consultation.findMany({
    where: getDateWhere(range.start, range.end),
    orderBy: { createdAt: 'desc' },
  });

  return successResponse(res, 'Appointments fetched successfully', { appointments: appointments.map(toApiRecord) });
});

export const getAdminApplications = asyncHandler(async (req, res) => {
  const range = getDateRange(req.query.range);
  const applications = await prisma.application.findMany({
    where: getDateWhere(range.start, range.end),
    select: applicationListSelect,
    orderBy: { createdAt: 'desc' },
  });

  return successResponse(res, 'Applications fetched successfully', {
    applications: applications.map(toApiApplication),
  });
});

export const getApplicationResume = asyncHandler(async (req, res) => {
  const application = await prisma.application.findUnique({ where: { id: req.params.id } });

  if (!application) {
    const error = new Error('Application not found.');
    error.statusCode = 404;
    throw error;
  }

  res.setHeader('Content-Type', application.resumeMimeType);
  res.setHeader('Content-Disposition', `inline; filename="${application.resumeFileName}"`);
  return res.send(Buffer.from(application.resumeData));
});
