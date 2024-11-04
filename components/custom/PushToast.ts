import { toast } from "sonner";

export const toastSuccess = (message: string) => {
  return toast.success(message, {
    duration: 2000,
    style: {
      background: "#7FFFD4",
      border: "0",
    },
  });
};

export const toastError = (message: string) => {
  return toast.error(message, {
    duration: 2000,
    style: {
      background: "#E3735E",
      border: "0",
      color: "#fff",
    },
  });
};
export const toastWarning = (message: string) => {
  return toast.error(message, {
    duration: 2000,
    style: {
      background: "#FDDA0D",
      border: "0",
    },
  });
};
export const toastInfo = (message: string) => {
  return toast.info(message, {
    duration: 2000,
    style: {
      background: "#00FFFF",
      border: "0",
    },
  });
};
