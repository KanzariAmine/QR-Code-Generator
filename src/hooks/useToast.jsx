import { useCallback, useState } from "react";
import Portal from "../components/Portal";
import Toast from "../components/Toast";
const useToast = () => {
  const [toast, setToast] = useState(null);

  const onClose = () => setToast(null);
  const triggerToast = useCallback((toastProps) => {
    setToast(toastProps);
    setTimeout(() => {
      setToast(null);
    }, toastProps.duration);
  }, []);

  const ToastComponent = toast ? (
    <Portal>
      <Toast {...toast} onClose={onClose} />
    </Portal>
  ) : null;
  return { ToastComponent, triggerToast };
};

export default useToast;
