'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  Eye,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  RefreshCw,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';
import { adminApiFetch, clearAdminToken, getAdminToken } from '../utils/adminAuth';

type Admin = {
  fullName: string;
  email: string;
};

type ContactMessage = {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  companyName?: string;
  message: string;
  createdAt: string;
};

type Appointment = {
  _id: string;
  email: string;
  serviceInterestedIn: string;
  preferredDate: string;
  preferredTime: string;
  createdAt: string;
};

type Application = {
  _id: string;
  fullName: string;
  email: string;
  college: string;
  graduationYear: string;
  role: string;
  experience: string;
  portfolio?: string;
  github?: string;
  resume?: {
    fileName: string;
    mimeType: string;
    size: number;
  };
  createdAt: string;
};

type BreakdownPoint = {
  name: string;
  value: number;
};

type Tab = 'messages' | 'appointments' | 'applications';
type DashboardView = 'dashboard' | Tab;
type RangeKey = 'last-24-hours' | 'last-week' | 'last-month' | 'last-year';

const RANGE_OPTIONS: Array<{ id: RangeKey; label: string }> = [
  { id: 'last-24-hours', label: 'Last 24 hours' },
  { id: 'last-week', label: 'Last week' },
  { id: 'last-month', label: 'Last month' },
  { id: 'last-year', label: 'Last year' },
];

const RECORD_MIX_COLORS = ['#0A5737', '#0E7490', '#1E3A5F'];
const SERVICE_COLORS = ['#0E7490', '#0891B2', '#38BDF8', '#67E8F9', '#164E63', '#0F766E'];
const ROLE_COLORS = ['#1E3A5F', '#334155', '#475569', '#64748B', '#256D85', '#0F766E'];

const formatDateTime = (value: string) => new Date(value).toLocaleString();

const formatFileSize = (bytes = 0) => {
  if (!bytes) return '0 KB';
  return `${Math.round(bytes / 1024)} KB`;
};

const initials = (value = 'Admin') => value.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || 'AD';

const getTrendLabel = (value: string, range: RangeKey) => {
  const date = new Date(value);

  if (range === 'last-24-hours') {
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  }

  if (range === 'last-year') {
    return date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
  }

  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};

const buildTrendPoints = (items: Array<{ createdAt: string }>, range: RangeKey) => {
  const counts = new Map<string, number>();

  items.forEach((item) => {
    const label = getTrendLabel(item.createdAt, range);
    counts.set(label, (counts.get(label) || 0) + 1);
  });

  return counts;
};

const buildBreakdown = <T,>(items: T[], getName: (item: T) => string, fallback: string) => {
  const counts = new Map<string, number>();

  items.forEach((item) => {
    const name = getName(item) || fallback;
    counts.set(name, (counts.get(name) || 0) + 1);
  });

  return Array.from(counts.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);
};

const AdminDashboard = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('messages');
  const [dashboardView, setDashboardView] = useState<DashboardView>('dashboard');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [range, setRange] = useState<RangeKey>('last-month');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openingResumeId, setOpeningResumeId] = useState('');
  const [resumePreview, setResumePreview] = useState<{ url: string; title: string } | null>(null);
  const [error, setError] = useState('');

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const query = `?range=${range}`;
      const [meData, messagesData, appointmentsData, applicationsData] = await Promise.all([
        adminApiFetch('/api/v1/admin/auth/me'),
        adminApiFetch(`/api/v1/admin/messages${query}`),
        adminApiFetch(`/api/v1/admin/appointments${query}`),
        adminApiFetch(`/api/v1/admin/applications${query}`),
      ]);

      setAdmin(meData.data.admin);
      setMessages(messagesData.data.messages || []);
      setAppointments(appointmentsData.data.appointments || []);
      setApplications(applicationsData.data.applications || []);
    } catch {
      clearAdminToken();
      router.push('/admin/login');
    } finally {
      setIsLoading(false);
    }
  }, [router, range]);

  useEffect(() => {
    if (!getAdminToken()) {
      router.push('/admin/login');
      return;
    }

    fetchDashboard();
  }, [fetchDashboard, router]);

  useEffect(() => {
    return () => {
      if (resumePreview?.url) {
        URL.revokeObjectURL(resumePreview.url);
      }
    };
  }, [resumePreview]);

  const handleLogout = () => {
    clearAdminToken();
    router.push('/admin/login');
  };

  const handleNavigate = (id: DashboardView) => {
    setDashboardView(id);
    if (id !== 'dashboard') setActiveTab(id);
    setIsMobileNavOpen(false);
  };

  const viewResume = async (applicationId: string) => {
    if (openingResumeId) return;

    setOpeningResumeId(applicationId);

    try {
      const response = await adminApiFetch(`/api/v1/admin/applications/${applicationId}/resume`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const application = applications.find((item) => item._id === applicationId);

      if (resumePreview?.url) {
        URL.revokeObjectURL(resumePreview.url);
      }

      setResumePreview({
        url,
        title: application?.resume?.fileName || `${application?.fullName || 'Candidate'} resume`,
      });
    } catch {
      setError('Unable to open resume right now.');
    } finally {
      setOpeningResumeId('');
    }
  };

  const closeResumePreview = () => {
    if (resumePreview?.url) {
      URL.revokeObjectURL(resumePreview.url);
    }

    setResumePreview(null);
  };

  const totals = {
    messages: messages.length,
    appointments: appointments.length,
    applications: applications.length,
  };
  const totalRecords = totals.messages + totals.appointments + totals.applications;
  const activeRangeLabel = RANGE_OPTIONS.find((option) => option.id === range)?.label || 'Selected range';

  const submissionTrendData = useMemo(() => {
    const messageTrend = buildTrendPoints(messages, range);
    const appointmentTrend = buildTrendPoints(appointments, range);
    const applicationTrend = buildTrendPoints(applications, range);
    const labels = new Set<string>();
    messageTrend.forEach((_count, label) => labels.add(label));
    appointmentTrend.forEach((_count, label) => labels.add(label));
    applicationTrend.forEach((_count, label) => labels.add(label));

    return Array.from(labels).map((label) => ({
      label,
      messages: messageTrend.get(label) || 0,
      appointments: appointmentTrend.get(label) || 0,
      applications: applicationTrend.get(label) || 0,
    }));
  }, [appointments, applications, messages, range]);

  const pipelineMix = useMemo(() => [
    { name: 'Messages', value: totals.messages },
    { name: 'Appointments', value: totals.appointments },
    { name: 'Applications', value: totals.applications },
  ], [totals.appointments, totals.applications, totals.messages]);

  const serviceBreakdown = useMemo(
    () => buildBreakdown(appointments, (appointment) => appointment.serviceInterestedIn, 'Unspecified service'),
    [appointments],
  );

  const roleBreakdown = useMemo(
    () => buildBreakdown(applications, (application) => application.role, 'Unspecified role'),
    [applications],
  );

  const metricCards = [
    { label: 'New messages', value: totals.messages, icon: Mail, color: 'from-[#0A5737] to-[#11845A]' },
    { label: 'Booked calls', value: totals.appointments, icon: CalendarDays, color: 'from-[#0E7490] to-[#0EA5A3]' },
    { label: 'Candidates', value: totals.applications, icon: Users, color: 'from-[#1E3A5F] to-[#256D85]' },
  ];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'messages', label: 'Messages', icon: MessageSquare, count: totals.messages },
    { id: 'appointments', label: 'Appointments', icon: CalendarDays, count: totals.appointments },
    { id: 'applications', label: 'Applications', icon: BriefcaseBusiness, count: totals.applications },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden text-slate-900">
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[232px] flex-col py-7 z-30 text-white" style={{ backgroundColor: '#0B251A' }}>
        <div className="px-6 pb-7 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold">ASG Solutions</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/60">Admin Console</div>
            </div>
          </div>
        </div>

        <nav className="pt-5">
          {navItems.map(({ id, label, icon: Icon, count }) => {
            const isActive = dashboardView === id;
            return (
              <button
                key={id}
                onClick={() => handleNavigate(id as DashboardView)}
                className={`w-full flex items-center gap-3 px-6 py-3 text-sm cursor-pointer transition-colors focus:outline-none ${isActive ? 'bg-[#D3D3D3] text-[#0B251A] font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
                {typeof count === 'number' && <span className={`ml-auto text-xs ${isActive ? 'text-[#0B251A]' : 'text-white/50'}`}>{count}</span>}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto px-6 pt-5">
          <div className="border-t border-white/10 pt-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center text-xs font-semibold">
              {initials(admin?.fullName)}
            </div>
            <div>
              <div className="text-xs font-semibold text-white">{admin?.fullName || 'Admin'}</div>
              <div className="text-[10px] text-white/60"><span className="inline-block w-1.5 h-1.5 rounded-full bg-white mr-1" />Online</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="lg:ml-[232px] max-w-7xl px-4 sm:px-6 lg:px-8 py-7">
        <header className="backdrop-blur sticky top-0 z-30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 mb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="w-11 h-11 bg-[#0B251A] rounded-lg flex items-center justify-center shadow-sm shrink-0 lg:hidden cursor-pointer focus:outline-none focus:ring-0"
                aria-label="Open dashboard menu"
              >
                <Menu className="w-6 h-6 text-white" />
              </button>
              <div>
                <h1 className="font-bold text-xl text-[#0A5737]">ASG Dashboard</h1>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-slate-900">{admin?.fullName || 'Admin'}</p>
              </div>
              <button onClick={fetchDashboard} className="h-10 w-10 rounded-lg inline-flex items-center justify-center cursor-pointer focus:outline-none focus:ring-0" title="Refresh">
                <RefreshCw className={`w-4 h-4 text-[#0A5737] ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <button onClick={handleLogout} className="h-10 px-3 sm:px-4 bg-[#0A5737] rounded-3xl text-white font-semibold inline-flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-0">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {isMobileNavOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              className="absolute inset-0 bg-black/45 cursor-default"
              onClick={() => setIsMobileNavOpen(false)}
              aria-label="Close dashboard menu overlay"
            />
            <aside className="absolute inset-y-0 left-0 w-[82vw] max-w-[300px] text-white shadow-2xl flex flex-col py-6" style={{ backgroundColor: '#0B251A' }}>
              <div className="px-5 pb-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">ASG Solutions</div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-white/60">Admin Console</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileNavOpen(false)}
                  className="w-9 h-9 bg-white/10 rounded-lg inline-flex items-center justify-center cursor-pointer focus:outline-none"
                  aria-label="Close dashboard menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="pt-5">
                {navItems.map(({ id, label, icon: Icon, count }) => {
                  const isActive = dashboardView === id;
                  return (
                    <button
                      key={id}
                      onClick={() => handleNavigate(id as DashboardView)}
                      className={`w-full flex items-center gap-3 px-5 py-3 text-sm cursor-pointer transition-colors focus:outline-none ${isActive ? 'bg-[#D3D3D3] text-[#0B251A] font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                      {typeof count === 'number' && <span className={`ml-auto text-xs ${isActive ? 'text-[#0B251A]' : 'text-white/50'}`}>{count}</span>}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-auto px-5 pt-5">
                <div className="border-t border-white/10 pt-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center text-xs font-semibold">
                    {initials(admin?.fullName)}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">{admin?.fullName || 'Admin'}</div>
                    <div className="text-[10px] text-white/60"><span className="inline-block w-1.5 h-1.5 rounded-full bg-white mr-1" />Online</div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}

        <section className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-950">Business Activity Overview</h2>
            <p className="text-slate-600 mt-2">{activeRangeLabel} performance from your saved records</p>
          </div>

          <div className="inline-flex flex-wrap gap-2 rounded-xl p-1 shadow-sm">
            {RANGE_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setRange(option.id)}
                className={`h-10 px-3 rounded-xl text-sm font-semibold cursor-pointer transition-colors focus:outline-none focus:ring-0 ${range === option.id ? 'bg-[#0A5737] text-white' : ''}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>

        {error && <div className="mb-4 text-sm text-red-700 border border-red-200 bg-red-50 rounded-xl p-3">{error}</div>}

        {dashboardView === 'dashboard' ? (
          <>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
              {metricCards.map(({ label, value, color, icon: Icon }) => (
                <div key={label} className={`bg-linear-to-br ${color} rounded-xl p-5 shadow-sm text-white`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-white/80">{label}</p>
                      <p className="text-4xl font-bold mt-2">{value}</p>
                    </div>
                    <div className="w-10 h-10 bg-white/20 text-white rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-xs text-white/75 mt-4">Updated for {activeRangeLabel.toLowerCase()}</p>
                </div>
              ))}
            </section>

            <section className="grid grid-cols-1 xl:grid-cols-[1.7fr_1fr] gap-5 mb-5">
          <div className="bg-linear-to-br from-[#071A2A] via-[#0D2B3A] to-[#12404A] rounded-xl p-5 shadow-sm min-h-[360px] text-white">
            <PanelTitle icon={BarChart3} title="Activity trend" detail="Messages, calls, and candidates over time" inverted />
                <div className="h-72 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={submissionTrendData}>
                      <defs>
                        <linearGradient id="messagesGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22C55E" stopOpacity={0.34} />
                          <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="appointmentsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" />
                  <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#cbd5e1' }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#cbd5e1' }} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ background: '#0f172a', border: '0', borderRadius: 10, color: '#fff' }} />
                  <Legend wrapperStyle={{ color: '#fff', fontSize: 12 }} />
                  <Area type="monotone" name="Messages" dataKey="messages" stroke="#34D399" fill="url(#messagesGradient)" strokeWidth={3} />
                  <Area type="monotone" name="Booked calls" dataKey="appointments" stroke="#38BDF8" fill="url(#appointmentsGradient)" strokeWidth={3} />
                  <Area type="monotone" name="Candidates" dataKey="applications" stroke="#CBD5E1" fill="rgba(203,213,225,0.12)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

          <div className="bg-linear-to-br from-[#141C2F] via-[#1D2E4A] to-[#243B5A] text-white rounded-xl p-5 shadow-sm min-h-[360px]">
            <PanelTitle icon={BarChart3} title="Record mix" detail="Current share by activity type" inverted />
            <div className="mt-7">
              <p className="text-6xl font-bold">{totalRecords}</p>
              <p className="text-sm text-blue-100 mt-2">Total records for {activeRangeLabel.toLowerCase()}</p>
                </div>
                <div className="h-44 mt-7">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pipelineMix} innerRadius={48} outerRadius={78} paddingAngle={4} dataKey="value">
                        {pipelineMix.map((entry, index) => (
                      <Cell key={entry.name} fill={RECORD_MIX_COLORS[index % RECORD_MIX_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {pipelineMix.map((item, index) => (
                    <div key={item.name} className="rounded-lg bg-white/10 border border-white/10 p-2">
                      <span className="block w-2.5 h-2.5 rounded-full mb-2" style={{ backgroundColor: RECORD_MIX_COLORS[index] }} />
                      <p className="text-blue-100">{item.name}</p>
                      <p className="font-bold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-5">
          <BreakdownChart
            title="Service interest"
            data={serviceBreakdown}
            emptyLabel="No consultation services in this range"
            variant="service"
          />
          <BreakdownChart
            title="Candidate roles"
            data={roleBreakdown}
            emptyLabel="No application roles in this range"
            variant="role"
          />
            </section>
          </>
        ) : (
          <section className="border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 md:p-6">
              {dashboardView === 'messages' && <MessagesTable messages={messages} />}
              {dashboardView === 'appointments' && <AppointmentsTable appointments={appointments} />}
              {dashboardView === 'applications' && <ApplicationsTable applications={applications} openingResumeId={openingResumeId} onViewResume={viewResume} />}
            </div>
          </section>
        )}
      </main>

      {resumePreview && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm p-3 sm:p-6 flex items-center justify-center">
          <div className="w-full max-w-5xl h-[86vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="h-14 px-4 sm:px-5 flex items-center justify-between border-b border-slate-200">
              <div>
                <h3 className="font-bold text-slate-950">Resume preview</h3>
                <p className="text-xs text-slate-500">{resumePreview.title}</p>
              </div>
              <button onClick={closeResumePreview} className="h-9 w-9 rounded-lg bg-[#0A5737] text-white inline-flex items-center justify-center cursor-pointer focus:outline-none focus:ring-0" title="Close preview" aria-label="Close preview">
                <X className="w-5 h-5" />
              </button>
            </div>
            <iframe title="Resume preview" src={resumePreview.url} className="w-full flex-1 bg-slate-100" />
          </div>
        </div>
      )}
    </div>
  );
};

const PanelTitle = ({ icon: Icon, title, detail, inverted = false }: { icon: typeof BarChart3; title: string; detail: string; inverted?: boolean }) => (
  <div className="flex items-center justify-between gap-4">
    <div>
      <h3 className={`font-bold text-lg ${inverted ? 'text-white' : 'text-slate-950'}`}>{title}</h3>
      <p className={`text-sm mt-1 ${inverted ? 'text-emerald-100' : 'text-slate-500'}`}>{detail}</p>
    </div>
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${inverted ? 'bg-white/10 text-white' : 'bg-emerald-50 text-[#0A5737]'}`}>
      <Icon className="w-5 h-5" />
    </div>
  </div>
);

const BreakdownChart = ({ title, data, emptyLabel, variant }: { title: string; data: BreakdownPoint[]; emptyLabel: string; variant: 'service' | 'role' }) => {
  const colors = variant === 'service' ? SERVICE_COLORS : ROLE_COLORS;
  const panelClass = variant === 'service'
    ? 'bg-linear-to-br from-[#062D34] via-[#0B3F46] to-[#0E5D61]'
    : 'bg-linear-to-br from-[#111827] via-[#1E293B] to-[#1E3A5F]';

  return (
  <div className={`${panelClass} rounded-xl p-5 shadow-sm min-h-80 text-white`}>
    <PanelTitle icon={BarChart3} title={title} detail="Ranked by submitted activity" inverted />
    {data.length ? (
      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 12, right: 16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={false} />
            <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12, fill: '#cbd5e1' }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12, fill: '#d1fae5' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#0f172a', border: '0', borderRadius: 10, color: '#fff' }} />
            <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={18}>
              {data.map((item, index) => (
                <Cell key={item.name} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    ) : (
      <EmptyState label={emptyLabel} />
    )}
  </div>
  );
};

const MessagesTable = ({ messages }: { messages: ContactMessage[] }) => (
  <div className="space-y-3">
    <div className="hidden lg:grid grid-cols-[1.2fr_1fr_0.9fr_1.8fr_1fr] gap-4 px-3 pb-3 text-xs uppercase tracking-wide">
      <span>Contact</span>
      <span>Company</span>
      <span>Phone</span>
      <span>Message</span>
      <span>Submitted</span>
    </div>
    {messages.map((message) => (
      <article key={message._id} className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_0.9fr_1.8fr_1fr] gap-3 lg:gap-4 rounded-xl p-4">
        <div>
          <p className="font-semibold text-slate-950">{message.fullName || 'Website contact'}</p>
          <p className="text-sm text-[#0A5737] wrap-break-word">{message.email}</p>
        </div>
        <InfoText label="Company" value={message.companyName || 'Not provided'} />
        <InfoText label="Phone" value={message.phone || 'Not provided'} />
        <InfoText label="Message" value={message.message} />
        <InfoText label="Submitted" value={formatDateTime(message.createdAt)} muted />
      </article>
    ))}
    {messages.length === 0 && <EmptyState label="No user messages in this range." />}
  </div>
);

const AppointmentsTable = ({ appointments }: { appointments: Appointment[] }) => (
  <div className="space-y-3">
    <div className="hidden lg:grid grid-cols-[1.3fr_0.9fr_0.9fr_1.3fr_1fr] gap-4 px-3 pb-3 text-xs uppercase tracking-wider">
      <span>Service</span>
      <span>Date</span>
      <span>Time</span>
      <span>Email</span>
      <span>Submitted</span>
    </div>
    {appointments.map((appointment) => (
      <article key={appointment._id} className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr_0.9fr_1.3fr_1fr] gap-3 lg:gap-4 rounded-xl p-4">
        <p className="font-semibold text-[#0A5737]">{appointment.serviceInterestedIn}</p>
        <InfoText label="Date" value={appointment.preferredDate} />
        <InfoText label="Time" value={appointment.preferredTime} />
        <InfoText label="Email" value={appointment.email} />
        <InfoText label="Submitted" value={formatDateTime(appointment.createdAt)} muted />
      </article>
    ))}
    {appointments.length === 0 && <EmptyState label="No appointments in this range." />}
  </div>
);

const ApplicationsTable = ({ applications, openingResumeId, onViewResume }: { applications: Application[]; openingResumeId: string; onViewResume: (applicationId: string) => void }) => (
  <div className="space-y-3">
    <div className="hidden xl:grid grid-cols-[1.4fr_1fr_0.8fr_1.3fr_1fr_auto] gap-4 px-3 pb-3 text-xs uppercase tracking-wider">
      <span>Candidate</span>
      <span>Role</span>
      <span>Experience</span>
      <span>Education</span>
      <span>Submitted</span>
      <span>Resume</span>
    </div>
    {applications.map((application) => (
      <article key={application._id} className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr_0.8fr_1.3fr_1fr_auto] gap-3 xl:gap-4 rounded-xl p-4">
        <div>
          <p className="font-semibold text-slate-950">{application.fullName}</p>
          <p className="text-sm text-[#0A5737] wrap-break-word">{application.email}</p>
          <p className="text-xs text-slate-500 mt-1 wrap-break-word">{application.portfolio || application.github || 'No links provided'}</p>
        </div>
        <InfoText label="Role" value={application.role} />
        <InfoText label="Experience" value={application.experience} />
        <InfoText label="Education" value={`${application.college} (${application.graduationYear})`} />
        <InfoText label="Submitted" value={formatDateTime(application.createdAt)} muted />
        <div className="xl:text-right">
          <button
            disabled={openingResumeId === application._id}
            onClick={() => onViewResume(application._id)}
            className="h-10 px-4 bg-[#0A5737] text-white rounded-lg text-sm font-semibold inline-flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-0 disabled:cursor-wait disabled:opacity-70"
          >
            <Eye className="w-4 h-4" />
            {openingResumeId === application._id ? 'Opening...' : 'View resume'}
          </button>
          <p className="text-xs text-slate-500 mt-2">{formatFileSize(application.resume?.size)}</p>
        </div>
      </article>
    ))}
    {applications.length === 0 && <EmptyState label="No applications in this range." />}
  </div>
);

const InfoText = ({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) => (
  <div>
    <p className="lg:hidden text-[11px] uppercase tracking-wide text-slate-400 mb-1">{label}</p>
    <p className={`${muted ? 'text-sm text-slate-500' : 'text-sm text-slate-700'} wrap-break-word`}>{value}</p>
  </div>
);

const EmptyState = ({ label }: { label: string }) => (
  <div className="py-16 text-center text-slate-500 font-semibold">{label}</div>
);

export default AdminDashboard;
