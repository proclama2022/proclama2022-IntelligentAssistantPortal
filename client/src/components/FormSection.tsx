import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
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

  return (
    <section id="form" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-primary text-white p-6">
            <h2 className="text-2xl md:text-3xl font-bold font-montserrat mb-2">Genera i tuoi documenti professionali</h2>
            <p className="text-white text-opacity-90">Compila i campi per creare automaticamente contratto e fattura di cortesia</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          className={`w-full p-3 border rounded-lg focus:outline-none transition-colors ${
                            form.formState.errors.nome ? "form-error" : ""
                          }`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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
                          className={`w-full p-3 border rounded-lg focus:outline-none transition-colors ${
                            form.formState.errors.cognome ? "form-error" : ""
                          }`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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
                          className={`w-full p-3 border rounded-lg focus:outline-none transition-colors ${
                            form.formState.errors.citta ? "form-error" : ""
                          }`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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
                          className={`w-full p-3 border rounded-lg focus:outline-none transition-colors ${
                            form.formState.errors.cap ? "form-error" : ""
                          }`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="indirizzo"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel htmlFor="indirizzo" className="text-sm font-medium text-gray-700">Indirizzo *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="indirizzo"
                          className={`w-full p-3 border rounded-lg focus:outline-none transition-colors ${
                            form.formState.errors.indirizzo ? "form-error" : ""
                          }`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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
                          className={`w-full p-3 border rounded-lg focus:outline-none transition-colors ${
                            form.formState.errors.partitaIva ? "form-error" : ""
                          }`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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
                          className={`w-full p-3 border rounded-lg focus:outline-none transition-colors ${
                            form.formState.errors.codiceFiscale ? "form-error" : ""
                          }`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="mt-8">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all transform hover:scale-105 focus:outline-none"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i> Elaborazione...
                    </>
                  ) : (
                    "GENERA DOCUMENTI"
                  )}
                </Button>
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                I dati inseriti saranno trattati ai sensi dell'art. 13 del Regolamento UE 2016/679 (GDPR) per la sola generazione dei documenti richiesti. 
                Leggi la nostra <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
