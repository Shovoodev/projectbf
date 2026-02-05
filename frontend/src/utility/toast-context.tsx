import React, { createContext, useCallback, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiXCircle,
  FiInfo,
  FiAlertCircle,
} from "react-icons/fi";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

interface ToastContextType {
  showToast: (message: string, type?: Toast["type"]) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: Toast["type"] = "info") => {
      const id = Date.now().toString();
      
      setToasts((prev) => {
        // Limit to 5 toasts maximum
        const newToasts = [...prev, { id, message, type }];
        return newToasts.slice(-5);
      });

      // Auto remove after 5 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 5000);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const getToastIcon = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return <FiCheckCircle className="text-green-500 text-xl" />;
      case "error":
        return <FiXCircle className="text-red-500 text-xl" />;
      case "warning":
        return <FiAlertCircle className="text-yellow-500 text-xl" />;
      case "info":
      default:
        return <FiInfo className="text-blue-500 text-xl" />;
    }
  };

  const getToastStyles = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "info":
      default:
        return "bg-blue-50 border-blue-200 text-blue-800";
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 w-full max-w-md pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast, index) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                duration: 0.3,
              }}
              className={`relative flex items-start gap-3 p-4 rounded-lg border shadow-lg pointer-events-auto ${getToastStyles(
                toast.type
              )}`}
            >
              {/* Icon */}
              <div className="flex-shrink-0 mt-0.5">
                {getToastIcon(toast.type)}
              </div>

              {/* Message */}
              <div className="flex-1">
                <p className="text-sm font-medium">{toast.message}</p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiXCircle className="text-lg" />
              </button>

              {/* Progress Bar */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="absolute bottom-0 left-0 right-0 h-1 rounded-b-lg"
                style={{
                  backgroundColor:
                    toast.type === "success"
                      ? "#10B981"
                      : toast.type === "error"
                      ? "#EF4444"
                      : toast.type === "warning"
                      ? "#F59E0B"
                      : "#3B82F6",
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  
  return context;
};