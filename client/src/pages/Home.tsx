import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TimelineSection from "@/components/TimelineSection";
import BiographySection from "@/components/BiographySection";
import HobbySection from "@/components/HobbySection";
import FormSection from "@/components/FormSection";
import PartitaIvaSection from "@/components/PartitaIvaSection";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    // Timeline scroll animations
    const checkTimeline = () => {
      const timelineElements = document.querySelectorAll('.timeline-animation');
      
      timelineElements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if(position.top < window.innerHeight * 0.9) {
          element.classList.add('visible');
        }
      });
    };
    
    // Check on load and scroll
    window.addEventListener('load', checkTimeline);
    window.addEventListener('scroll', checkTimeline);
    
    // Cleanup
    return () => {
      window.removeEventListener('load', checkTimeline);
      window.removeEventListener('scroll', checkTimeline);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TimelineSection />
        <BiographySection />
        <HobbySection />
        <FormSection />
        <PartitaIvaSection />
      </main>
      <Footer />
    </div>
  );
}
