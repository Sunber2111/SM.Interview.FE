import { toast } from "react-toastify";

export const showError = (message: String, autoCLose: number = 3000) => {
  toast.error(message, {
    position: "top-right",
    autoClose: autoCLose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const showSuccess = (message: String, autoCLose: number = 3000) => {
  toast.success(message, {
    position: "top-right",
    autoClose: autoCLose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
