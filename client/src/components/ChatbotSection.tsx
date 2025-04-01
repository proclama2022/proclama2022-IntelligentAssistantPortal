import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";

export default function ChatbotSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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