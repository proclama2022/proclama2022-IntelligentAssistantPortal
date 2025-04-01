import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-6 md:px-12 py-3 flex justify-between items-center">
        <div className="logo">
          <h1 className="text-xl font-bold font-montserrat text-primary">AI Per Commercialisti</h1>
        </div>
        
        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="text-primary focus:outline-none"
            aria-label="Toggle menu"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/">
            <a className="text-foreground hover:text-primary transition-colors font-medium">Home</a>
          </Link>
          <Link href="#contact">
            <a className="text-foreground hover:text-primary transition-colors font-medium">Contatti</a>
          </Link>
          <Link href="#form">
            <Button className="bg-accent hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-lg transition-all transform hover:scale-105">
              Iscriviti Ora
            </Button>
          </Link>
        </nav>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? "" : "hidden"} md:hidden bg-white w-full border-t`}>
        <div className="container mx-auto px-6 md:px-12 py-3 flex flex-col space-y-3">
          <Link href="/">
            <a className="text-foreground hover:text-primary transition-colors font-medium py-2">Home</a>
          </Link>
          <Link href="#contact">
            <a className="text-foreground hover:text-primary transition-colors font-medium py-2">Contatti</a>
          </Link>
          <Link href="#form">
            <a className="bg-accent hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-lg text-center transition-all">
              Iscriviti Ora
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}
