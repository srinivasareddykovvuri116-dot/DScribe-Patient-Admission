
import { CheckCircle, AlertCircle, X } from "lucide-react";

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isError = toast.type === "error";

  return (
    <div className={`toast ${isError ? "toast-error" : "toast-success"}`}>
      {isError ? <AlertCircle size={19} /> : <CheckCircle size={19} />}

      <span>{toast.message}</span>

      <button
        type="button"
        className="toast-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}
