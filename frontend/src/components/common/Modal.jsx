
import { X } from "lucide-react";

export default function Modal({ title, children, onClose }) {
  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div
        className="modal-content"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{title}</h2>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
