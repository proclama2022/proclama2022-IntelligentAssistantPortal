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
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
              Chi è Rosario Emmi
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-foreground/80 max-w-2xl mx-auto">
              Dottore Commercialista specializzato in Startup Innovative e Intelligenza Artificiale
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div variants={itemVariants} className="relative">
              <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden shadow-lg">
                {/* Placeholder per l'immagine che aggiungerai in seguito */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span className="text-sm">Immagine del Relatore</span>
                </div>
              </div>
              
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-primary text-white px-4 py-2 rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <span className="font-bold">100+ Startup Innovative</span>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div 
                className="text-lg leading-relaxed"
                variants={itemVariants}
              >
                <p className="mb-4">
                  Rosario Emmi è un Dottore Commercialista con sede a Linguaglossa (CT), specializzato in startup e PMI innovative, digitalizzazione dei processi aziendali e applicazione dell'intelligenza artificiale al settore professionale. Co-founder e business developer di Proclama SPA tra professionisti, è riconosciuto come uno dei maggiori esperti in Italia nel settore delle startup innovative.
                </p>
                
                <h3 className="text-xl font-bold text-primary mt-6 mb-2">Esperienza con Startup Innovative</h3>
                <p className="mb-2">
                  Professionista con esperienza pluriennale nel settore dell'innovazione, ha contribuito alla costituzione, gestione e sviluppo di oltre 100 startup e PMI innovative. Nel suo percorso professionale ha raggiunto traguardi significativi, tra cui:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>La costituzione come socio e amministratore della prima startup innovativa iscritta in provincia di Catania (inizio 2013)</li>
                  <li>La costituzione della prima startup innovativa senza notaio attraverso procedura telematica (luglio 2016)</li>
                  <li>Collaborazione con il Ministero dello Sviluppo Economico come esperto in materia di startup innovative</li>
                </ul>
                
                <h3 className="text-xl font-bold text-primary mt-6 mb-2">Competenze Digitali e Intelligenza Artificiale</h3>
                <p className="mb-2">
                  Pioniere nell'integrazione delle tecnologie digitali alla professione, Rosario Emmi è esperto in:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Automazioni di business e per studi professionali potenziati da AI generativa</li>
                  <li>Sviluppo di soluzioni digitali personalizzate con intelligenza artificiale</li>
                  <li>Digitalizzazione dei processi aziendali e business process management</li>
                </ul>
                
                <p>
                  Nel 2015 ha ricevuto il premio di "Professionista Digitale dell'Anno" dall'Osservatorio sulle Professioni del Politecnico di Milano, riconoscimento della sua visione innovativa della professione.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg"
                initial={{ x: 20, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <p className="italic text-primary/90">
                  "Appassionato di innovazione e tecnologia sin dall'infanzia, continua a coniugare la sua formazione economica con l'applicazione pratica delle tecnologie più avanzate per trasformare il modo di operare degli studi professionali e delle imprese clienti."
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}