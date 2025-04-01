import { useState } from "react";
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
      const res = await apiRequest("POST", "/api/generate-documents", data);
      
      if (res.ok) {
        toast({
          title: "Documenti generati con successo!",
          description: "Controlla la tua email per scaricarli.",
          variant: "default",
        });
        
        form.reset();
      }
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la generazione dei documenti.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <section id="form" className="py-16 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary opacity-5 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-accent opacity-5 translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4">
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
              Il Tuo Contratto Generato Con AI in 90 Minuti
            </h2>
            <p className="text-foreground max-w-lg mx-auto">
              Dimostra ai tuoi clienti il potere dell'IA compilando il form e ricevendo contratto e fattura personalizzati
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
              <h3 className="text-xl md:text-2xl font-bold font-montserrat mb-2">Genera i tuoi documenti professionali</h3>
              <p className="text-white text-opacity-90">Compila i campi per creare automaticamente contratto e fattura di cortesia</p>
              
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
                        Elaborazione...
                      </>
                    ) : (
                      "GENERA DOCUMENTI"
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
      </div>
    </section>
  );
}
