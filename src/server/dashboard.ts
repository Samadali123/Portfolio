import { prisma } from './db';

const DATE_RANGES: Record<string, { label: string; days: number }> = {
  'last-24-hours': { label: 'Last 24 hours', days: 1 },
  'last-week': { label: 'Last week', days: 7 },
  'last-month': { label: 'Last month', days: 30 },
  'last-year': { label: 'Last year', days: 365 },
};

export const applicationListSelect = {
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

export const getRangeConfig = (range = 'last-month') => DATE_RANGES[range] || DATE_RANGES['last-month'];

export const getDateRange = (range?: string | null) => {
  const config = getRangeConfig(range || 'last-month');
  const end = new Date();
  const start = new Date(end);
  start.setDate(start.getDate() - config.days);

  const previousStart = new Date(start);
  previousStart.setDate(previousStart.getDate() - config.days);

  return { ...config, start, end, previousStart };
};

export const getDateWhere = (start: Date, end: Date) => ({
  createdAt: {
    gte: start,
    lte: end,
  },
});

export const toApiRecord = (record: any) => ({
  ...record,
  _id: record.id,
});

export const toApiApplication = (application: any) => ({
  ...toApiRecord(application),
  resume: {
    fileName: application.resumeFileName,
    mimeType: application.resumeMimeType,
    size: application.resumeSize,
  },
});

const getTrendLabel = (date: Date, days: number) => {
  const formatter =
    days <= 1
      ? new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit', hour12: false })
      : days <= 31
        ? new Intl.DateTimeFormat('en', { day: '2-digit', month: 'short' })
        : new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' });

  return formatter.format(new Date(date)).replace('24:00', '00:00');
};

const buildTrend = async (delegate: any, where: any, days: number) => {
  const rows = await delegate.findMany({
    where,
    select: { createdAt: true },
    orderBy: { createdAt: 'asc' },
  });

  const counts = rows.reduce((acc: Map<string, number>, row: any) => {
    const label = getTrendLabel(row.createdAt, days);
    acc.set(label, (acc.get(label) || 0) + 1);
    return acc;
  }, new Map<string, number>());

  return [...counts.entries()].map(([label, count]) => ({ label, count }));
};

const buildTopBreakdown = async (delegate: any, where: any, field: string, fallbackLabel: string) => {
  const rows = await delegate.groupBy({
    by: [field],
    where,
    _count: { _all: true },
  });

  return rows
    .map((item: any) => ({
      name: item[field] || fallbackLabel,
      value: item._count._all,
    }))
    .sort((a: any, b: any) => b.value - a.value)
    .slice(0, 6);
};

export const getOverview = async (rangeQuery?: string | null) => {
  const range = getDateRange(rangeQuery);
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

  return {
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
  };
};
