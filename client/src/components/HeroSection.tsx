import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden" style={{background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"}}>
      <div className="absolute right-0 bottom-0 opacity-10 md:opacity-20">
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="300" cy="300" r="300" fill="#1A4D8C" />
          <path d="M150 150h300v300H150z" stroke="#00A67E" strokeWidth="8" />
          <path d="M200 200L400 400M400 200L200 400" stroke="#00A67E" strokeWidth="8" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat text-primary leading-tight mb-4">
            Dalla Teoria alla Pratica: L'AI che Risolve Problemi Concreti del Commercialista
          </h1>
          
          <p className="text-lg md:text-xl text-foreground mb-8">
            Trasforma il tuo studio professionale con strumenti di intelligenza artificiale concreti e immediati
          </p>
          
          <Link href="#form">
            <Button className="bg-accent hover:bg-opacity-90 text-white font-bold py-3 px-8 text-lg rounded-lg transition-all transform hover:scale-105 hover:shadow-lg">
              Inizia Ora
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
