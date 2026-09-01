import React, { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Lock, Sparkles, Key, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/common/Logo';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const AdminLogin: React.FC = () => {
  const [passphrase, setPassphrase] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login, isAuthenticated, lockoutRemainingSeconds } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin/dashboard';

  // If already logged in, redirect to dashboard cleanly
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const result = await login(passphrase);
    setIsLoading(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setErrorMessage(result.error || 'Authentication failed.');
    }
  };

  return (
    <div className="min-h-screen bg-[#182B28] flex flex-col justify-center items-center px-4 py-12 text-[#EDEFF4]">
      <SEO title="Admin Login | DriveCraft Content Gateway" />

      {/* Grid texture */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#3D6357_1px,transparent_1px),linear-gradient(to_bottom,#3D6357_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative w-full max-w-md bg-[#26423E] border border-[#3D6357] rounded-3xl p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Logo variant="light" size="md" isLink={false} />
          </div>
          <h1 className="text-xl font-bold font-display text-white">
            Administrative Content Gateway
          </h1>
          <p className="text-xs text-[#C2D3D0]">
            Enter master administrative passphrase to manage website content, courses, and settings.
          </p>
        </div>

        {/* Lockout warning */}
        {lockoutRemainingSeconds > 0 && (
          <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
            <span>
              Security lockout active. Please wait <strong>{lockoutRemainingSeconds}s</strong> before next attempt.
            </span>
          </div>
        )}

        {/* Error message */}
        {errorMessage && lockoutRemainingSeconds === 0 && (
          <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="passphrase" className="block text-xs font-bold text-[#C2D3D0] uppercase tracking-wider mb-1.5">
              Master Admin Passphrase
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-[#56776A] absolute left-3.5 top-3.5" />
              <input
                id="passphrase"
                type="password"
                required
                autoFocus
                placeholder="Enter passphrase..."
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                disabled={lockoutRemainingSeconds > 0}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#182B28] border border-[#3D6357] text-white text-sm focus:ring-2 focus:ring-[#42B7A7] focus:outline-none placeholder:text-[#56776A]"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            disabled={lockoutRemainingSeconds > 0}
            className="w-full justify-center shadow-lg"
            icon={<Lock className="w-4 h-4" />}
          >
            Access Admin Center
          </Button>
        </form>

        {/* Static Architecture Disclosure */}
        <div className="pt-4 border-t border-[#3D6357] text-center space-y-2">
          <div className="p-3 rounded-xl bg-[#182B28]/60 border border-[#3D6357] text-[0.72rem] text-[#C2D3D0] leading-relaxed">
            <span className="font-semibold text-[#42B7A7] block mb-0.5">Architecture Notice:</span>
            Client-side content management with reactive draft sync and JSON backup for zero-database deployment.
          </div>

          <div className="text-[0.7rem] text-[#56776A]">
            Demo Passphrase: <code className="text-[#42B7A7] font-mono bg-[#182B28] px-1.5 py-0.5 rounded">drivecraft2024</code> or <code className="text-[#42B7A7] font-mono bg-[#182B28] px-1.5 py-0.5 rounded">admin123</code>
          </div>
        </div>

        <div className="text-center pt-2">
          <Button variant="ghost" size="sm" to="/" className="text-xs text-[#C2D3D0] hover:text-white">
            ← Back to Public Website
          </Button>
        </div>
      </div>
    </div>
  );
};
