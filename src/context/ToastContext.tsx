import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ type, title, message, duration = 4500 }: Omit<Toast, 'id'>) => {
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newToast: Toast = { id, type, title, message, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      {/* Toast Render Container */}
      <div
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0"
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((toast) => {
          const bgColors = {
            success: 'bg-emerald-50 border-emerald-300 text-emerald-950',
            error: 'bg-red-50 border-red-300 text-red-950',
            warning: 'bg-amber-50 border-amber-300 text-amber-950',
            info: 'bg-blue-50 border-blue-300 text-blue-950',
          };

          const iconColors = {
            success: 'text-emerald-600',
            error: 'text-red-600',
            warning: 'text-amber-600',
            info: 'text-blue-600',
          };

          const icons = {
            success: <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${iconColors.success}`} />,
            error: <AlertCircle className={`w-5 h-5 flex-shrink-0 ${iconColors.error}`} />,
            warning: <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${iconColors.warning}`} />,
            info: <Info className={`w-5 h-5 flex-shrink-0 ${iconColors.info}`} />,
          };

          return (
            <div
              key={toast.id}
              role={toast.type === 'error' ? 'alert' : 'status'}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all transform duration-200 translate-y-0 ${bgColors[toast.type]}`}
            >
              {icons[toast.type]}
              <div className="flex-1 text-sm">
                <div className="font-semibold text-slate-900">{toast.title}</div>
                {toast.message && <p className="mt-0.5 text-slate-700 text-xs leading-relaxed">{toast.message}</p>}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                aria-label="Close notification"
                className="p-1 rounded-lg hover:bg-black/5 text-slate-500 hover:text-slate-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
