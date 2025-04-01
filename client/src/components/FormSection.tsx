import { useState, useRef } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormSchema } from "@/lib/types";

export default function FormSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedDocuments, setGeneratedDocuments] = useState<{
    contract: string;
  } | null>(null);
  const contractRef = useRef<HTMLDivElement>(null);
  
  const [refForm, inViewForm] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nome: "",
      cognome: "",
      citta: "",
      cap: "",
      indirizzo: "",
      partitaIva: "",
      codiceFiscale: ""
    }
  });
  
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    
    try {
      const response = await apiRequest("POST", "/api/generate-documents", data);
      const responseData = await response.json();
      
      if (response.ok && responseData.documents) {
        toast({
          title: "Documenti generati con successo!",
          description: "I tuoi documenti sono pronti.",
          variant: "default",
        });
        
        setGeneratedDocuments(responseData.documents);
        
        // Scroll to documents after a short delay
        setTimeout(() => {
          if (contractRef.current) {
            contractRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      }
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la generazione dei documenti.",
        variant: "destructive",
      });
      setGeneratedDocuments(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    form.reset();
    setGeneratedDocuments(null);
  };

  // Per scaricare i documenti come file di testo
  const downloadAsTextFile = (text: string, filename: string) => {
    const element = document.createElement('a');
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Animation variants
  const formContainerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const formHeaderVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Documento generato con animazione
  const documentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section id="form" className="py-16 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary opacity-5 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-accent opacity-5 translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 md:px-12">
        {!generatedDocuments ? (
          <motion.div 
            className="max-w-2xl mx-auto"
            ref={refForm}
            initial="hidden"
            animate={inViewForm ? "visible" : "hidden"}
            variants={formContainerVariants}
          >
            <motion.div 
              className="mb-8 text-center"
              variants={formHeaderVariants}
            >
              <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-primary mb-3">
                Sito Web e Automazione Creati in 90 Minuti con AI
              </h2>
              <p className="text-foreground max-w-lg mx-auto">
                Questo intero sito è stato creato in soli 90 minuti con l'AI. Compila il form per generare un contratto personalizzato e vedere in azione l'automazione che puoi ottenere.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              variants={formContainerVariants}
            >
              <motion.div 
                className="bg-gradient-to-r from-primary to-primary/90 text-white p-6 relative"
                variants={formHeaderVariants}
              >
                <h3 className="text-xl md:text-2xl font-bold font-montserrat mb-2">Genera il tuo contratto professionale</h3>
                <p className="text-white text-opacity-90">Compila i campi per creare automaticamente un contratto personalizzato con AI</p>
                
                {/* Added badge */}
                <div className="absolute -right-12 top-8 rotate-45 bg-accent text-white text-xs font-bold px-10 py-1 shadow-lg z-10">
                  90 minuti con AI
                </div>
              </motion.div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={formItemVariants}>
                      <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="nome" className="text-sm font-medium text-gray-700">Nome *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id="nome"
                                className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${
                                  form.formState.errors.nome ? "border-red-500 focus:ring-red-200" : "border-gray-300"
                                }`}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    <motion.div variants={formItemVariants}>
                      <FormField
                        control={form.control}
                        name="cognome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="cognome" className="text-sm font-medium text-gray-700">Cognome *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id="cognome"
                                className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${
                                  form.formState.errors.cognome ? "border-red-500 focus:ring-red-200" : "border-gray-300"
                                }`}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    <motion.div variants={formItemVariants}>
                      <FormField
                        control={form.control}
                        name="citta"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="citta" className="text-sm font-medium text-gray-700">Città *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id="citta"
                                className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${
                                  form.formState.errors.citta ? "border-red-500 focus:ring-red-200" : "border-gray-300"
                                }`}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    <motion.div variants={formItemVariants}>
                      <FormField
                        control={form.control}
                        name="cap"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="cap" className="text-sm font-medium text-gray-700">CAP *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id="cap"
                                className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${
                                  form.formState.errors.cap ? "border-red-500 focus:ring-red-200" : "border-gray-300"
                                }`}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    <motion.div variants={formItemVariants} className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="indirizzo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="indirizzo" className="text-sm font-medium text-gray-700">Indirizzo *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id="indirizzo"
                                className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${
                                  form.formState.errors.indirizzo ? "border-red-500 focus:ring-red-200" : "border-gray-300"
                                }`}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    <motion.div variants={formItemVariants}>
                      <FormField
                        control={form.control}
                        name="partitaIva"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="partitaIva" className="text-sm font-medium text-gray-700">Partita IVA *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id="partitaIva"
                                className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${
                                  form.formState.errors.partitaIva ? "border-red-500 focus:ring-red-200" : "border-gray-300"
                                }`}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    <motion.div variants={formItemVariants}>
                      <FormField
                        control={form.control}
                        name="codiceFiscale"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="codiceFiscale" className="text-sm font-medium text-gray-700">Codice Fiscale *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id="codiceFiscale"
                                className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${
                                  form.formState.errors.codiceFiscale ? "border-red-500 focus:ring-red-200" : "border-gray-300"
                                }`}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="mt-8"
                    variants={formItemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Elaborazione con AI...
                        </>
                      ) : (
                        "GENERA CONTRATTO CON AI"
                      )}
                    </Button>
                  </motion.div>
                  
                  <motion.div 
                    className="mt-4 text-sm text-gray-500"
                    variants={formItemVariants}
                  >
                    I dati inseriti saranno trattati ai sensi dell'art. 13 del Regolamento UE 2016/679 (GDPR) per la sola generazione dei documenti richiesti. 
                    Leggi la nostra <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                  </motion.div>
                </form>
              </Form>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={documentVariants}
          >
            <div className="text-center mb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2
                }}
                className="inline-block mb-6"
              >
                <div className="bg-green-100 text-green-800 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </motion.div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Contratto Generato con AI</h2>
              <p className="text-gray-600 mb-4">Il tuo contratto è stato generato con successo in pochi secondi grazie all'intelligenza artificiale!</p>
              
              <div className="flex justify-center space-x-4 mb-8">
                <Button 
                  onClick={handleReset}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold"
                >
                  Torna al Form
                </Button>
              </div>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {/* Contratto */}
              <motion.div 
                ref={contractRef}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-primary text-white p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">Contratto di Consulenza</h3>
                    <Button 
                      onClick={() => downloadAsTextFile(generatedDocuments.contract, "contratto_ai.txt")}
                      className="bg-white text-primary hover:bg-primary-50 text-sm px-3 py-1"
                    >
                      Scarica
                    </Button>
                  </div>
                </div>
                <div className="p-4 max-h-96 overflow-y-auto font-mono text-sm whitespace-pre-wrap bg-gray-50">
                  {generatedDocuments.contract}
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="text-center mt-10 bg-blue-50 p-6 rounded-xl shadow border border-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-lg font-bold text-blue-800 mb-2">
                Questo è solo un esempio di ciò che potete fare con AI
              </h3>
              <p className="text-blue-700">
                Il nostro corso vi insegnerà come creare strumenti come questo in soli 90 minuti. Immaginate cosa potrete fare per il vostro studio di commercialista!
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
