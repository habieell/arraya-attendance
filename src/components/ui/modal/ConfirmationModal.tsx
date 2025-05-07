"use client";
import React from "react";
import { Modal } from "./Modal";
import { AlertTriangle } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description,
  confirmText = "Yes, delete",
  cancelText = "Cancel",
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="p-6 max-w-md">
      <div className="space-y-5 text-center">
        <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
          <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>
        {description && <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>}

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-60"
          >
            {isLoading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};
