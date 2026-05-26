'use client';

import { FormEvent, Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, User, ShieldCheck } from 'lucide-react';
import { adminApiFetch, setAdminToken } from '../utils/adminAuth';

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong.';
};

const AdminAuth = ({ mode }: { mode: 'login' | 'register' | 'forgot' | 'reset' }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetToken = useMemo(() => searchParams?.get('token') || '', [searchParams]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const title = {
    login: 'Admin Login',
    register: 'Create Admin',
    forgot: 'Reset Access',
    reset: 'Set New Password',
  }[mode];

  const subtitle = {
    login: 'Access the private ASG Solutions operations dashboard.',
    register: 'Hidden setup page for authorized administrators.',
    forgot: 'Enter your admin email to receive a reset link.',
    reset: 'Create a new password for your admin account.',
  }[mode];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    setMessage('');

    const formData = new FormData(event.currentTarget);

    try {
      if (mode === 'login') {
        const data = await adminApiFetch('/api/v1/admin/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            email: formData.get('email'),
            password: formData.get('password'),
          }),
        });
        setAdminToken(data.data.token);
        router.push('/admin/dashboard');
      }

      if (mode === 'register') {
        const data = await adminApiFetch('/api/v1/admin/auth/register', {
          method: 'POST',
          body: JSON.stringify({
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            password: formData.get('password'),
          }),
        });
        setAdminToken(data.data.token);
        router.push('/admin/dashboard');
      }

      if (mode === 'forgot') {
        await adminApiFetch('/api/v1/admin/auth/forgot-password', {
          method: 'POST',
          body: JSON.stringify({ email: formData.get('email') }),
        });
        setMessage('If an admin account exists, a reset email has been sent.');
      }

      if (mode === 'reset') {
        await adminApiFetch('/api/v1/admin/auth/reset-password', {
          method: 'POST',
          body: JSON.stringify({
            token: resetToken || formData.get('token'),
            password: formData.get('password'),
          }),
        });
        setMessage('Password reset successfully. You can login now.');
      }
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen theme-page-bg flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md theme-card border theme-border-secondary rounded-2xl shadow-xl p-8">
        <div className="w-14 h-14 theme-bg-secondary rounded-2xl flex items-center justify-center mb-6">
          <ShieldCheck className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-3xl font-bold theme-text-secondary">{title}</h1>
        <p className="text-gray-600 mt-2 mb-8">{subtitle}</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'register' && (
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Full Name</span>
              <div className="relative mt-2">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 theme-text-secondary" />
                <input name="fullName" required className="theme-input w-full rounded-xl pl-10 pr-4 py-3 focus:outline-none theme-focus-secondary" placeholder="Admin name" />
              </div>
            </label>
          )}

          {(mode === 'login' || mode === 'register' || mode === 'forgot') && (
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Email</span>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 theme-text-secondary" />
                <input type="email" name="email" required className="theme-input w-full rounded-xl pl-10 pr-4 py-3 focus:outline-none theme-focus-secondary" placeholder="admin@asgsolutions.com" />
              </div>
            </label>
          )}

          {(mode === 'login' || mode === 'register' || mode === 'reset') && (
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Password</span>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 theme-text-secondary" />
                <input type="password" name="password" required minLength={8} className="theme-input w-full rounded-xl pl-10 pr-4 py-3 focus:outline-none theme-focus-secondary" placeholder="Minimum 8 characters" />
              </div>
            </label>
          )}

          {mode === 'reset' && !resetToken && (
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Reset Token</span>
              <input name="token" required className="theme-input w-full rounded-xl px-4 py-3 mt-2 focus:outline-none theme-focus-secondary" placeholder="Paste reset token" />
            </label>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="text-sm theme-text-secondary font-semibold">{message}</p>}

          <button disabled={isSubmitting} className="w-full theme-bg-secondary text-white rounded-xl py-3 font-bold cursor-pointer disabled:opacity-70">
            {isSubmitting ? 'Please wait...' : title}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between gap-4 text-sm">
          {mode === 'register' && (
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/admin/login" className="theme-text-secondary font-bold">Login</Link>
            </p>
          )}
          {(mode === 'forgot' || mode === 'reset') && <Link href="/admin/login" className="theme-text-secondary font-semibold">Back to login</Link>}
          {mode === 'login' && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full sm:justify-between">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link href="/admin/register" className="theme-text-secondary font-bold">Register</Link>
              </p>
              <Link href="/admin/forgot-password" className="theme-text-secondary font-semibold">Forgot password?</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function AdminAuthWithSuspense(props: { mode: 'login' | 'register' | 'forgot' | 'reset' }) {
  return (
    <Suspense fallback={null}>
      <AdminAuth {...props} />
    </Suspense>
  );
}
