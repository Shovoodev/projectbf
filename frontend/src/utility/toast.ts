import { toast, ToastOptions } from "react-toastify";

const baseOptions: ToastOptions = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

type CustomToastOptions = {
  duration?: number;
  options?: ToastOptions;
};

const withOptions = (
  overrides?: CustomToastOptions
): ToastOptions => ({
  ...baseOptions,
  autoClose: overrides?.duration ?? baseOptions.autoClose,
  ...overrides?.options,
});

export const showToast = {
  success: (message: string, config?: CustomToastOptions) =>
    toast.success(message, withOptions(config)),

  error: (message: string, config?: CustomToastOptions) =>
    toast.error(message, withOptions(config)),

  info: (message: string, config?: CustomToastOptions) =>
    toast.info(message, withOptions(config)),

  warning: (message: string, config?: CustomToastOptions) =>
    toast.warn(message, withOptions(config)),
};
