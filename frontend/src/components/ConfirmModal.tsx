import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ActionButton from "./ActionButton";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  variant?: "danger" | "primary" | "success" | "warning";
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title = "Confirm Action",
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  variant = "danger",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {title}
            </h2>

            <p className="text-gray-600 mb-6">{message}</p>

            <div className="flex justify-end gap-3">
              {/* Cancel */}
              <button
                onClick={onCancel}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              >
                {cancelText}
              </button>

              {/* Confirm */}
              <ActionButton
                onClick={onConfirm}
                text={confirmText}
                loading={loading}
                loadingText="Processing..."
                variant={variant}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
