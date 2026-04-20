import React, { useState } from 'react';
import Header          from '../components/Header.jsx';
import HeroSlider      from '../components/HeroSlider.jsx';
import ChipStrip       from '../components/ChipStrip.jsx';
import AboutSection    from '../components/AboutSection.jsx';
import ContactSection  from '../components/ContactSection.jsx';
import ReelsSection    from '../components/ReelsSection.jsx';
import FounderSection  from '../components/FounderSection.jsx';
import UpcomingProjects from '../components/UpcomingProjects.jsx';
import Footer          from '../components/Footer.jsx';
import EnquiryModal    from '../components/EnquiryModal.jsx';
import ContactModal    from '../components/ContactModal.jsx';

export default function Home() {
  const [enquirySlide,   setEnquirySlide]   = useState(null);  // opened by slider click
  const [contactModalOpen, setContactModalOpen] = useState(false); // opened by Contact Us button

  return (
    <>
      <Header onContactClick={() => setContactModalOpen(true)} />

      <main>
        <HeroSlider onSlideClick={(slide) => setEnquirySlide(slide)} />
        <ChipStrip />
        <AboutSection onContactClick={() => setContactModalOpen(true)} />
        <ContactSection />
        <ReelsSection />
        <FounderSection />
        <UpcomingProjects onEnquire={(proj) => setEnquirySlide({ title: proj.name, category: proj.type, location: proj.location })} />
      </main>

      <Footer onContactClick={() => setContactModalOpen(true)} />

      {/* Modals */}
      <EnquiryModal
        slide={enquirySlide}
        onClose={() => setEnquirySlide(null)}
      />
      <ContactModal
        open={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </>
  );
}
