import React from 'react';
import { X } from 'lucide-react';
import { ConsultationSection } from './ConsultationSection';
import { GradeLevel, Course } from '../types';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedGrade?: GradeLevel;
  preselectedCourse?: Course | null;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  preselectedGrade,
  preselectedCourse,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl shadow-2xl border border-white/20 overflow-hidden my-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Render ConsultationSection inside modal */}
        <div className="max-h-[90vh] overflow-y-auto">
          <ConsultationSection
            preselectedGrade={preselectedGrade}
            preselectedCourse={preselectedCourse}
          />
        </div>
      </div>
    </div>
  );
};
