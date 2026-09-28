import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <aside aria-label="Notifications" className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
            toast.type === 'success'
              ? 'bg-neutral-900/95 text-white border-neutral-700/80 dark:bg-neutral-900 dark:border-neutral-800'
              : toast.type === 'warning'
              ? 'bg-amber-950/95 text-amber-100 border-amber-800/80'
              : 'bg-neutral-900/95 text-white border-neutral-700/80'
          }`}
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold tracking-tight">{toast.title}</h4>
            <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">{toast.message}</p>
            {toast.action && (
              <button
                onClick={() => {
                  toast.action?.onClick();
                  removeToast(toast.id);
                }}
                className="mt-2 text-xs font-semibold text-blue-400 hover:text-blue-300 underline underline-offset-2"
              >
                {toast.action.label}
              </button>
            )}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </aside>
  );
};
