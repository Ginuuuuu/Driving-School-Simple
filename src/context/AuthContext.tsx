import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { sha256, ADMIN_HASH, ADMIN_FALLBACK_HASH } from '../utils/crypto';
import { useToast } from './ToastContext';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (passphrase: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  failedAttempts: number;
  lockoutRemainingSeconds: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = 'drivecraft_admin_session';
const ATTEMPTS_KEY = 'drivecraft_login_attempts';
const LOCKOUT_KEY = 'drivecraft_login_lockout_until';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  });

  const [failedAttempts, setFailedAttempts] = useState<number>(() => {
    return parseInt(localStorage.getItem(ATTEMPTS_KEY) || '0', 10);
  });

  const [lockoutRemainingSeconds, setLockoutRemainingSeconds] = useState<number>(0);
  const { showToast } = useToast();

  // Check lockout on mount and tick
  useEffect(() => {
    const checkLockout = () => {
      const lockoutUntil = parseInt(localStorage.getItem(LOCKOUT_KEY) || '0', 10);
      const now = Date.now();
      if (lockoutUntil > now) {
        setLockoutRemainingSeconds(Math.ceil((lockoutUntil - now) / 1000));
      } else {
        setLockoutRemainingSeconds(0);
      }
    };

    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, []);

  const login = useCallback(
    async (passphrase: string): Promise<{ success: boolean; error?: string }> => {
      if (lockoutRemainingSeconds > 0) {
        return {
          success: false,
          error: `Too many failed attempts. Please wait ${lockoutRemainingSeconds}s before trying again.`,
        };
      }

      if (!passphrase || passphrase.trim().length === 0) {
        return { success: false, error: 'Passphrase is required.' };
      }

      const inputHash = await sha256(passphrase.trim());

      if (inputHash === ADMIN_HASH || inputHash === ADMIN_FALLBACK_HASH || passphrase.trim() === 'drivecraft2024') {
        // Reset attempts
        localStorage.removeItem(ATTEMPTS_KEY);
        localStorage.removeItem(LOCKOUT_KEY);
        setFailedAttempts(0);
        setLockoutRemainingSeconds(0);

        sessionStorage.setItem(SESSION_KEY, 'true');
        setIsAuthenticated(true);

        showToast({
          type: 'success',
          title: 'Admin Session Activated',
          message: 'Welcome back, Administrator. You can now edit and manage site content.',
        });

        return { success: true };
      } else {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);
        localStorage.setItem(ATTEMPTS_KEY, nextAttempts.toString());

        if (nextAttempts >= 4) {
          const lockTime = Date.now() + 30 * 1000; // 30 seconds lock
          localStorage.setItem(LOCKOUT_KEY, lockTime.toString());
          setLockoutRemainingSeconds(30);

          showToast({
            type: 'error',
            title: 'Security Lockout Activated',
            message: '4 incorrect attempts recorded. Portal locked for 30 seconds.',
          });

          return {
            success: false,
            error: 'Security lockout: 4 failed attempts. Locked for 30s.',
          };
        }

        showToast({
          type: 'error',
          title: 'Invalid Passphrase',
          message: `Incorrect credentials. ${4 - nextAttempts} attempts remaining before temporary lockout.`,
        });

        return {
          success: false,
          error: `Incorrect credentials. ${4 - nextAttempts} attempts remaining. (Hint for demo: 'drivecraft2024' or 'admin123')`,
        };
      }
    },
    [failedAttempts, lockoutRemainingSeconds, showToast]
  );

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    showToast({
      type: 'info',
      title: 'Logged Out',
      message: 'Admin session closed securely.',
    });
  }, [showToast]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        failedAttempts,
        lockoutRemainingSeconds,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
