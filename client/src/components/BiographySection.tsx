import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function BiographySection() {
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
    <section id="biografia" className="py-16 bg-gradient-to-b from-background to-background/90">
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
              Chi è Rosario Emmi
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-4"></div>
            <p className="text-foreground/80 max-w-2xl mx-auto">
              Dottore Commercialista specializzato in Startup Innovative e Intelligenza Artificiale
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <motion.div variants={itemVariants} className="relative">
              <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/images/rosario-emmi.jpg" 
                  alt="Rosario Emmi - Dottore Commercialista" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <motion.div 
                className="absolute -bottom-4 -right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <span className="font-bold">100+ Startup Innovative</span>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <motion.div 
                className="text-base md:text-lg"
                variants={itemVariants}
              >
                <p className="mb-4">
                  Rosario Emmi è un Dottore Commercialista specializzato in startup innovative, digitalizzazione dei processi aziendali e applicazione dell'intelligenza artificiale. È riconosciuto come uno dei maggiori esperti in Italia nel settore delle startup innovative.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-primary mb-2">Startup Innovative</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Oltre 100 startup e PMI innovative costituite</li>
                      <li>Prima startup innovativa in Provincia di Catania (2013)</li>
                      <li>Collaborazione con il MISE</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-primary mb-2">Expertise in AI</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Automazioni di business con AI generativa</li>
                      <li>Soluzioni digitali personalizzate</li>
                      <li>Professionista Digitale dell'Anno 2015</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg"
                initial={{ x: 20, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <p className="italic text-primary/90">
                  "Appassionato di innovazione e tecnologia, trasforma il modo di operare degli studi professionali con l'applicazione pratica delle tecnologie più avanzate."
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}