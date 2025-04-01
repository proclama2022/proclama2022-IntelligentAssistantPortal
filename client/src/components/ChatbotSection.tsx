import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function ChatbotSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  useEffect(() => {
    // Rimuove qualsiasi script o stile Dify esistente
    const removeExistingDify = () => {
      const existingScript = document.getElementById('2SMbssbWJ4595DdF');
      if (existingScript) {
        existingScript.remove();
      }
      
      const existingConfig = document.getElementById('dify-config');
      if (existingConfig) {
        existingConfig.remove();
      }
      
      const existingStyle = document.getElementById('dify-style');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
    
    // Rimuove eventuali script esistenti
    removeExistingDify();
    
    // Aggiunge la configurazione
    const configScript = document.createElement('script');
    configScript.id = 'dify-config';
    configScript.text = `
      window.difyChatbotConfig = {
        token: '2SMbssbWJ4595DdF',
        baseUrl: 'https://dify-e9toe-u35360.vm.elestio.app'
      }
    `;
    document.head.appendChild(configScript);
    
    // Aggiunge lo stile
    const styleElement = document.createElement('style');
    styleElement.id = 'dify-style';
    styleElement.innerHTML = `
      #dify-chatbot-bubble-button {
        background-color: #1C64F2 !important;
      }
      #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: 40rem !important;
      }
    `;
    document.head.appendChild(styleElement);
    
    // Aggiunge lo script
    const script = document.createElement('script');
    script.src = 'https://dify-e9toe-u35360.vm.elestio.app/embed.min.js';
    script.id = '2SMbssbWJ4595DdF';
    script.defer = true;
    document.body.appendChild(script);
    
    // Cleanup
    return () => {
      removeExistingDify();
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="chatbot" className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Prova l'AI Conversazionale
            </h2>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <p className="text-foreground/80 mb-6">
              Clicca sull'icona del chatbot nell'angolo in basso a destra per conversare con un assistente AI che risponde a domande sul tariffario ANC per dottori commercialisti.
            </p>
            <p className="text-foreground/80 mb-6">
              Questo è un esempio di applicazione AI sviluppata con Gemini Flash 2.0 e integrata nello stesso tempo di realizzazione di questa landing page (90 minuti). Le risposte potrebbero non essere precise, poiché il modello utilizzato non è il più performante e il sistema è stato creato in poco tempo, ma illustra le potenzialità di queste tecnologie.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 inline-block mt-2">
              <p className="text-sm italic text-gray-600">
                "Con più tempo e risorse, è possibile creare assistenti virtuali molto più precisi e personalizzati per le tue esigenze professionali."
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}