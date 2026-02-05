import React from "react";
import clsx from "clsx";

interface ActionButtonProps {
  onClick: () => void;
  text: string;
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  variant?: "danger" | "primary" | "success" | "warning";
  className?: string;
  type?: "button" | "submit";
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  text,
  loading = false,
  loadingText = "Processing...",
  disabled = false,
  variant = "primary",
  className = "",
  type = "button",
}) => {
  const variantClasses = {
    danger: "bg-red-500 hover:bg-red-600",
    primary: "bg-blue-500 hover:bg-blue-600",
    success: "bg-green-500 hover:bg-green-600",
    warning: "bg-yellow-500 hover:bg-yellow-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        "px-4 py-2 rounded-lg text-white transition disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        className
      )}
    >
      {loading ? loadingText : text}
    </button>
  );
};

export default ActionButton;
