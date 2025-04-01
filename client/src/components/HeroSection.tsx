import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden" style={{background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"}}>
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-full h-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.circle 
                cx="400" 
                cy="400" 
                r="350" 
                fill="#1A4D8C" 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 8
                }}
              />
              <motion.path 
                d="M200 200h400v400H200z" 
                stroke="#00A67E" 
                strokeWidth="8" 
                fill="none"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 50, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
              <motion.path 
                d="M250 250L550 550M550 250L250 550" 
                stroke="#00A67E" 
                strokeWidth="8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ 
                  duration: 3, 
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1
                }}
              />
            </svg>
          </motion.div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat text-primary leading-tight mb-4">
              Dalla Teoria alla Pratica: L'AI che Risolve Problemi Concreti del Commercialista
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <p className="text-lg md:text-xl text-foreground mb-8">
              Trasforma il tuo studio professionale con strumenti di intelligenza artificiale concreti e immediati
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="#form">
              <Button className="bg-accent hover:bg-opacity-90 text-white font-bold py-3 px-8 text-lg rounded-lg shadow-lg transition-all">
                Inizia Ora
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Floating badge */}
      <motion.div 
        className="absolute top-16 right-16 hidden lg:block"
        initial={{ opacity: 0, rotate: -10, y: 20 }}
        animate={{ opacity: 1, rotate: 0, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <div className="bg-accent text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center">
          <span className="mr-2 text-2xl">⏱️</span>
          <span>Sito creato in 90 minuti con AI!</span>
        </div>
      </motion.div>
    </section>
  );
}
