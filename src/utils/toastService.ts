export type ToastType = 'success' | 'error' | 'warning' | 'info';

type ToastPayload = {
  message: string;
  type?: ToastType;
};

let listener: ((payload: ToastPayload) => void) | null = null;

export const ToastService = {
  register(fn: (payload: ToastPayload) => void) {
    listener = fn;
  },
  show(message: string, type: ToastType = 'info') {
    listener?.({ message, type });
  },
};
