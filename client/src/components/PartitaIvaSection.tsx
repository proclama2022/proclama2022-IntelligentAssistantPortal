import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";

export default function PartitaIvaSection() {
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
    <section id="partitaiva" className="py-16 bg-muted/30">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-3 p-8 md:p-12">
                <motion.div variants={itemVariants}>
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                    Reingegnerizzazione dei Processi con Intelligenza Artificiale
                  </h2>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <p className="text-foreground/80 mb-6">
                    Su <span className="font-semibold">partitaiva.ai</span>, aiutiamo aziende e studi professionali a ripensare e ottimizzare i loro processi attraverso l'intelligenza artificiale. L'analisi delle attività esistenti permette di identificare inefficienze e proporre soluzioni innovative basate su agenti intelligenti, chatbot e automazione avanzata.
                  </p>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <ul className="space-y-2 mb-8">
                    <li className="flex items-start">
                      <span className="text-accent mr-2">✓</span>
                      <span>Analisi dei processi aziendali</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">✓</span>
                      <span>Soluzioni AI personalizzate e chatbot</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">✓</span>
                      <span>Reingegnerizzazione completa dei processi</span>
                    </li>
                  </ul>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Button 
                    className="bg-accent hover:bg-opacity-90 text-white py-2 px-6 rounded-lg"
                    onClick={() => window.open('https://partitaiva.ai', '_blank')}
                  >
                    Scopri partitaiva.ai
                  </Button>
                </motion.div>
              </div>
              
              <div className="hidden md:block md:col-span-2 bg-gradient-to-br from-primary to-primary/80 p-12 flex items-center justify-center">
                <motion.div 
                  variants={itemVariants}
                  className="text-center text-white"
                >
                  <h3 className="text-xl font-bold mb-4">Benefici dell'approccio AI</h3>
                  <p className="text-white/90 mb-6">
                    La trasformazione dei processi attraverso l'AI porta efficienza operativa, riducendo tempi e costi. Le soluzioni sono scalabili ed evolvono con le esigenze aziendali, mentre l'esperienza di clienti e collaboratori migliora grazie a interazioni più intuitive e immediate.
                  </p>
                  <div className="inline-block border-2 border-white/30 rounded-lg p-4 mt-2">
                    <p className="text-sm font-light italic">
                      "Trasformiamo la complessità in opportunità, costruendo un futuro più digitale ed efficiente."
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}