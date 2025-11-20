import React, { createContext, useContext, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

type ToastItem = {
  id: string;
  title?: string;
  body: string;
  bg?: string;
};

type ToastContextType = {
  showToast: (t: Omit<ToastItem, "id">) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (t: Omit<ToastItem, "id">) => {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 7);
    setToasts(prev => [...prev, { id, ...t }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(x => x.id !== id));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer position="top-end" className="p-3">
        {toasts.map(t => (
          <Toast key={t.id} bg={t.bg} onClose={() => setToasts(prev => prev.filter(x => x.id !== t.id))}>
            {t.title && <Toast.Header><strong className="me-auto">{t.title}</strong></Toast.Header>}
            <Toast.Body>{t.body}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

export default ToastContext;
