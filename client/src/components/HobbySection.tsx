import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function HobbySection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
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
    <section id="passioni" className="py-16 bg-accent/5">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div className="text-center mb-10" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
              Non Solo Lavoro
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-4"></div>
            <p className="text-foreground/80 max-w-2xl mx-auto">
              Perché la vita è un equilibrio tra professione e passioni personali
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div variants={itemVariants} className="order-2 lg:order-1">
              <motion.div 
                className="text-base md:text-lg"
                variants={itemVariants}
              >
                <p className="mb-6">
                  La vita non è fatta di soli numeri e startup. Nel tempo libero, Rosario coltiva la sua passione per la ricerca del tartufo insieme alla sua fedele amica a quattro zampe, Martha, un magnifico esemplare di Lagotto Romagnolo.
                </p>
                
                <motion.div 
                  className="bg-white p-5 rounded-lg shadow-md border border-accent/10 mb-6"
                  initial={{ x: -20, opacity: 0 }}
                  animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <h3 className="text-xl font-bold text-primary mb-3">La Ricerca del Tartufo</h3>
                  <p className="italic text-foreground/80 mb-4">
                    "Esplorare i boschi con Martha è la mia forma di meditazione. La ricerca del tartufo mi insegna pazienza, attenzione ai dettagli e connessione con la natura - qualità che porto anche nel mio lavoro quotidiano."
                  </p>
                  <div className="flex items-center">
                    <div className="w-1 h-12 bg-accent mr-4"></div>
                    <p className="text-sm">
                      Il Lagotto Romagnolo è una razza canina italiana nota per la sua eccezionale capacità di trovare tartufi grazie al suo olfatto raffinato.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Galleria di immagini */}
            <motion.div variants={itemVariants} className="order-1 lg:order-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Prima immagine principale - Martha */}
                <div className="col-span-2">
                  <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                    <img 
                      src="/images/tartufo-1.jpg" 
                      alt="Rosario Emmi e la ricerca del tartufo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Seconda immagine */}
                <div className="col-span-1">
                  <div className="aspect-square rounded-lg overflow-hidden shadow-md">
                    <img 
                      src="/images/tartufo-2.jpg" 
                      alt="Rosario Emmi con il suo cane lagotto" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Terza immagine */}
                <div className="col-span-1">
                  <div className="aspect-square rounded-lg overflow-hidden shadow-md">
                    <img 
                      src="/images/tartufo-3.jpg" 
                      alt="Rosario Emmi alla ricerca del tartufo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              
              <motion.div 
                className="bg-primary text-white p-4 rounded-lg shadow-md w-fit ml-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <p className="font-medium text-sm">
                  La perfetta combinazione di passione e precisione!
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}