import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div id="modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            id="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-deep/80 backdrop-blur-md"
          />

          {/* Modal Content Wrapper */}
          <motion.div
            id="modal-content"
            initial={{ scale: 0.92, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl glass-panel-heavy p-6 shadow-2xl md:p-8"
          >
            {/* Ambient Background Glow Inside Modal */}
            <div className="absolute -top-24 -left-24 -z-10 h-48 w-48 rounded-full bg-brand-navy/30 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 -z-10 h-48 w-48 rounded-full bg-brand-violet/20 blur-3xl" />

            {/* Header */}
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-serif text-xl font-bold tracking-tight text-white md:text-2xl">
                {title}
              </h3>
              <button
                id="modal-close-btn"
                onClick={onClose}
                className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="text-slate-300">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
