import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GradeSubjectTable } from './components/GradeSubjectTable';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ConsultationSection } from './components/ConsultationSection';
import { ContactMapSection } from './components/ContactMapSection';
import { Footer } from './components/Footer';
import { FloatingContacts } from './components/FloatingContacts';
import { ConsultationModal } from './components/ConsultationModal';
import { CommunityQrModal } from './components/CommunityQrModal';
import { GradeLevel, Course } from './types';

export default function App() {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [preselectedGradeForModal, setPreselectedGradeForModal] = useState<GradeLevel | undefined>(undefined);
  const [preselectedCourseForModal, setPreselectedCourseForModal] = useState<Course | null>(null);

  // When parent clicks consultation button in hero / navbar / footer
  const handleOpenConsultationModal = (grade?: GradeLevel) => {
    setPreselectedGradeForModal(grade);
    setPreselectedCourseForModal(null);
    setIsModalOpen(true);
  };

  // Scroll to consultation section on main page
  const handleScrollToConsultation = () => {
    const el = document.querySelector('#dang-ky-tu-van');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Sticky Header with Emergency Contact & Social Links */}
      <Navbar
        onOpenConsultationModal={() => handleOpenConsultationModal()}
        onOpenCommunityModal={() => setIsCommunityModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onOpenConsultationModal={(grade) => handleOpenConsultationModal(grade)}
          onOpenCommunityModal={() => setIsCommunityModalOpen(true)}
          onSelectGradeFilter={(grade) => setSelectedGrade(grade)}
        />

        {/* Table of Grades and Subjects (Bảng Khối Lớp & Môn Học) */}
        <GradeSubjectTable
          selectedGrade={selectedGrade}
          onSelectGrade={(grade) => setSelectedGrade(grade)}
        />

        {/* Why Choose Us & Commitments */}
        <WhyChooseUs onOpenConsultation={handleScrollToConsultation} />

        {/* Main Embedded Online Consultation Registration Form */}
        <ConsultationSection
          preselectedGrade={selectedGrade !== 'all' ? selectedGrade : undefined}
          preselectedCourse={preselectedCourseForModal}
          onClearPreselectedCourse={() => setPreselectedCourseForModal(null)}
          onOpenCommunityModal={() => setIsCommunityModalOpen(true)}
        />

        {/* Address, Hotline, Facebook & Google Maps Section */}
        <ContactMapSection onOpenConsultation={handleScrollToConsultation} />
      </main>

      {/* Footer */}
      <Footer
        onSelectGrade={(grade) => setSelectedGrade(grade)}
        onOpenConsultation={handleScrollToConsultation}
        onOpenCommunityModal={() => setIsCommunityModalOpen(true)}
      />

      {/* Floating Action Buttons (Hotline, Zalo, Facebook, Quick Consultation, Community) */}
      <FloatingContacts
        onOpenConsultation={() => handleOpenConsultationModal()}
        onOpenCommunityModal={() => setIsCommunityModalOpen(true)}
      />

      {/* Pop-up Consultation Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preselectedGrade={preselectedGradeForModal}
        preselectedCourse={preselectedCourseForModal}
      />

      {/* Community QR Code & Zalo Access Modal */}
      <CommunityQrModal
        isOpen={isCommunityModalOpen}
        onClose={() => setIsCommunityModalOpen(false)}
      />
    </div>
  );
}
