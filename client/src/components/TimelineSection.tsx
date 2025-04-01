import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as React from "react";

export default function TimelineSection() {
  const [refTimeline, inViewTimeline] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [refCompare, inViewCompare] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -left-32 top-0 w-64 h-64 rounded-full bg-primary opacity-5"></div>
      <div className="absolute -right-32 bottom-0 w-64 h-64 rounded-full bg-accent opacity-5"></div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 2.5
            }}
          >
            <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-primary mb-3">
              90 Minuti di AI: Dalla Teoria alla Pratica
            </h2>
          </motion.div>
          <p className="text-foreground max-w-2xl mx-auto">
            Questo sito e la funzionalità di generazione documenti sono stati creati in soli 90 minuti utilizzando AI. Ti insegneremo come fare lo stesso!
          </p>
        </motion.div>
        
        {/* Modern Timeline */}
        <div className="timeline-container relative">
          {/* Timeline connector */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-2 bg-gradient-to-r from-[#4A90E2] via-[#50E3C2] to-[#B06ADB] rounded-full z-0"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 relative">
            {/* Step 1 */}
            <motion.div 
              className="w-full md:w-1/3 p-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: inViewTimeline ? 1 : 0, y: inViewTimeline ? 0 : 50 }}
              transition={{ duration: 0.5 }}
              ref={refTimeline}
            >
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-6 relative z-10 border-t-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{borderTopColor: "#4A90E2"}}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="w-16 h-16 text-white rounded-full flex items-center justify-center mb-4 mx-auto"
                  style={{backgroundColor: "#4A90E2"}}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <i className="fas fa-lightbulb text-xl"></i>
                </motion.div>
                <h3 className="text-xl font-semibold font-montserrat text-center mb-2">Fase 1: Ideazione con AI</h3>
                <p className="text-center text-gray-600 mb-3">Impara a formulare prompt efficaci per generare idee innovative</p>
                <div className="bg-gradient-to-r from-[#4A90E2] to-[#6AAFFF] rounded-full p-2 text-center text-sm font-medium text-white shadow-md">
                  30 minuti
                </div>
              </motion.div>
            </motion.div>
            
            {/* Step 2 */}
            <motion.div 
              className="w-full md:w-1/3 p-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: inViewTimeline ? 1 : 0, y: inViewTimeline ? 0 : 50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-6 relative z-10 border-t-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{borderTopColor: "#50E3C2"}}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="w-16 h-16 text-white rounded-full flex items-center justify-center mb-4 mx-auto"
                  style={{backgroundColor: "#50E3C2"}}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <i className="fas fa-code text-xl"></i>
                </motion.div>
                <h3 className="text-xl font-semibold font-montserrat text-center mb-2">Fase 2: Sviluppo con Replit Agents</h3>
                <p className="text-center text-gray-600 mb-3">Costruisci soluzioni pratiche con agenti AI senza necessità di programmazione</p>
                <div className="bg-gradient-to-r from-[#50E3C2] to-[#7AFFDF] rounded-full p-2 text-center text-sm font-medium text-white shadow-md">
                  30 minuti
                </div>
              </motion.div>
            </motion.div>
            
            {/* Step 3 */}
            <motion.div 
              className="w-full md:w-1/3 p-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: inViewTimeline ? 1 : 0, y: inViewTimeline ? 0 : 50 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-6 relative z-10 border-t-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{borderTopColor: "#B06ADB"}}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="w-16 h-16 text-white rounded-full flex items-center justify-center mb-4 mx-auto"
                  style={{backgroundColor: "#B06ADB"}}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <i className="fas fa-robot text-xl"></i>
                </motion.div>
                <h3 className="text-xl font-semibold font-montserrat text-center mb-2">Fase 3: Automazione con Make.com</h3>
                <p className="text-center text-gray-600 mb-3">Automatizza processi ripetitivi integrando le tue soluzioni con i sistemi esistenti</p>
                <div className="bg-gradient-to-r from-[#B06ADB] to-[#D289FF] rounded-full p-2 text-center text-sm font-medium text-white shadow-md">
                  30 minuti
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Comparison box */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: inViewCompare ? 1 : 0, y: inViewCompare ? 0 : 50 }}
            transition={{ duration: 0.7 }}
            ref={refCompare}
          >
            {/* Badge */}
            <div className="absolute -right-14 top-8 rotate-45 bg-accent text-white text-xs font-bold px-10 py-1 shadow-lg z-10">
              Realizzato in 90 Minuti
            </div>
            
            <motion.h3 
              className="text-2xl font-bold font-montserrat text-center mb-8"
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
              style={{
                background: "linear-gradient(90deg, #1A4D8C, #00A67E, #B06ADB)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Confronto con il Metodo Tradizionale
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                className="rounded-lg overflow-hidden border border-gray-200"
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <h4 className="font-bold text-lg text-center text-gray-700">Metodo Tradizionale</h4>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">❌</span>
                      <span><span className="font-medium">Ricerca soluzioni:</span> 3-5 giorni</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">❌</span>
                      <span><span className="font-medium">Sviluppo progetto:</span> 1-2 settimane</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">❌</span>
                      <span><span className="font-medium">Implementazione:</span> 2-3 giorni</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">❌</span>
                      <span>Costi elevati di consulenza</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">❌</span>
                      <span>Dipendenza da sviluppatori esterni</span>
                    </li>
                  </ul>
                  <div className="mt-6 text-center">
                    <span className="inline-block bg-red-50 text-red-600 font-bold py-2 px-4 rounded-lg shadow border border-red-200">
                      Totale: 2-3 settimane
                    </span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="rounded-lg overflow-hidden border border-accent"
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-accent text-white p-4">
                  <h4 className="font-bold text-lg text-center">Metodo AI</h4>
                </div>
                <div className="p-6 bg-accent bg-opacity-5">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-accent mr-2">✓</span>
                      <span><span className="font-medium">Ideazione AI:</span> 30 minuti</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">✓</span>
                      <span><span className="font-medium">Sviluppo Replit:</span> 30 minuti</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">✓</span>
                      <span><span className="font-medium">Automazione:</span> 30 minuti</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">✓</span>
                      <span>Controllo completo sul processo</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">✓</span>
                      <span>Personalizzazione immediata</span>
                    </li>
                  </ul>
                  <motion.div 
                    className="mt-6 text-center"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <span className="inline-block bg-accent text-white font-bold py-2 px-4 rounded-lg shadow-lg">
                      Totale: 90 minuti
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
