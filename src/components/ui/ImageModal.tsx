import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  alt?: string;
  caption?: string;
}

export default function ImageModal({ isOpen, onClose, imageSrc, alt = "", caption }: ImageModalProps) {
  const previousOverflowRef = useRef<string>("");

  useEffect(() => {
    if (!isOpen) return;

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflowRef.current;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div
      className="luxury-modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={alt || "Image modal"}
    >
      <div className="luxury-modal-panel" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="luxury-modal-close"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        <img
          src={imageSrc}
          alt={alt}
          className="luxury-modal-img"
        />
        {caption && (
          <p className="luxury-modal-caption">{caption}</p>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
