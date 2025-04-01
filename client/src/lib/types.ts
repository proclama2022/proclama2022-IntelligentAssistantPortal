import { z } from "zod";

export const FormSchema = z.object({
  nome: z.string().min(1, "Il nome è obbligatorio"),
  cognome: z.string().min(1, "Il cognome è obbligatorio"),
  citta: z.string().min(1, "La città è obbligatoria"),
  cap: z
    .string()
    .min(1, "Il CAP è obbligatorio")
    .length(5, "Il CAP deve essere di 5 cifre")
    .regex(/^\d{5}$/, "Il CAP deve contenere solo numeri"),
  indirizzo: z.string().min(1, "L'indirizzo è obbligatorio"),
  partitaIva: z
    .string()
    .min(1, "La partita IVA è obbligatoria")
    .length(11, "La partita IVA deve essere di 11 cifre")
    .regex(/^\d{11}$/, "La partita IVA deve contenere solo numeri"),
  codiceFiscale: z
    .string()
    .min(1, "Il codice fiscale è obbligatorio")
    .length(16, "Il codice fiscale deve essere di 16 caratteri")
    .regex(/^[A-Z0-9]{16}$/, "Il codice fiscale deve contenere solo lettere maiuscole e numeri")
});

export type FormData = z.infer<typeof FormSchema>;
