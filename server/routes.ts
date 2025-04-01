import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDocumentSchema } from "@shared/schema";

// Funzione per generare il contratto usando i dati del cliente
function generateAIContract(data: any): string {
  const contractDate = new Date().toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return `
CONTRATTO DI CONSULENZA COMMERCIALISTA CON INTEGRAZIONE AI
${contractDate}

TRA
${data.nome} ${data.cognome}, con sede in ${data.indirizzo}, ${data.cap} ${data.citta}
Partita IVA: ${data.partitaIva}
Codice Fiscale: ${data.codiceFiscale}
(di seguito denominato "Cliente")

E
Studio di Consulenza AI, con sede legale in Via delle Tecnologie, 123 - Milano
Partita IVA: 12345678901
(di seguito denominato "Consulente")

PREMESSO CHE
- Il Cliente necessita di servizi di consulenza fiscale e contabile;
- Il Consulente offre servizi innovativi basati su intelligenza artificiale;
- Le parti intendono stabilire un rapporto di collaborazione professionale;

SI CONVIENE E SI STIPULA QUANTO SEGUE:

1. OGGETTO DEL CONTRATTO
   1.1. Il Cliente affida al Consulente, che accetta, l'incarico di fornire servizi di consulenza fiscale e contabile con supporto di strumenti di intelligenza artificiale.
   1.2. I servizi includono: analisi dei dati finanziari, preparazione di dichiarazioni fiscali, ottimizzazione fiscale, consulenza strategica potenziata da algoritmi predittivi.

2. DURATA
   2.1. Il presente contratto ha durata di 12 mesi a partire dalla data di sottoscrizione.
   2.2. Al termine, il contratto si rinnoverà automaticamente per periodi di uguale durata, salvo disdetta da comunicarsi con preavviso di almeno 30 giorni.

3. COMPENSO
   3.1. Per i servizi di cui al punto 1, il Cliente corrisponderà al Consulente un compenso annuale di € 2.400,00 oltre IVA.
   3.2. Il pagamento avverrà in rate mensili di € 200,00 oltre IVA, entro il giorno 5 di ogni mese.
   3.3. In caso di ritardo nei pagamenti, saranno applicati interessi di mora al tasso legale vigente.

4. OBBLIGHI DEL CONSULENTE
   4.1. Prestare i servizi con diligenza professionale e nel rispetto delle normative vigenti.
   4.2. Garantire che gli strumenti di intelligenza artificiale utilizzati siano conformi alle normative sulla privacy.
   4.3. Mantenere la riservatezza sulle informazioni del Cliente.
   4.4. Fornire spiegazioni comprensibili sulle decisioni suggerite dai sistemi AI.

5. OBBLIGHI DEL CLIENTE
   5.1. Fornire tempestivamente dati e documenti necessari per l'esecuzione dell'incarico.
   5.2. Corrispondere il compenso nei termini stabiliti.
   5.3. Collaborare attivamente all'implementazione delle soluzioni proposte.

6. PROPRIETÀ INTELLETTUALE
   6.1. I modelli di intelligenza artificiale e i software utilizzati restano di proprietà esclusiva del Consulente.
   6.2. I dati forniti dal Cliente rimangono di sua proprietà.

7. LIMITAZIONI DI RESPONSABILITÀ
   7.1. Il Consulente è responsabile per i danni diretti causati da negligenza.
   7.2. La responsabilità massima è limitata all'importo del compenso annuale.
   7.3. Il Cliente riconosce che i sistemi AI forniscono raccomandazioni e che la decisione finale spetta ai professionisti umani.

8. RISOLUZIONE
   8.1. Ciascuna parte può risolvere il contratto in caso di grave inadempimento dell'altra parte.
   8.2. In caso di risoluzione anticipata, il Cliente dovrà corrispondere il compenso maturato fino alla data di cessazione.

9. LEGGE APPLICABILE E FORO COMPETENTE
   9.1. Il presente contratto è regolato dalla legge italiana.
   9.2. Per ogni controversia sarà competente il Foro di Milano.

10. TRATTAMENTO DEI DATI PERSONALI
    10.1. Le parti si impegnano al trattamento dei dati personali in conformità al GDPR (Regolamento UE 2016/679).
    10.2. Il Cliente autorizza l'utilizzo dei propri dati per l'addestramento dei modelli AI, previa anonimizzazione.

Letto, approvato e sottoscritto il ${contractDate}.

Il Cliente                                        Il Consulente
___________________                              ___________________
${data.nome} ${data.cognome}                     Studio di Consulenza AI
`;
}

// Funzione per generare la fattura di cortesia
function generateCourtesyInvoice(data: any): string {
  const invoiceDate = new Date().toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  const invoiceNumber = `AI-${Math.floor(Math.random() * 10000)}-${new Date().getFullYear()}`;

  return `
FATTURA DI CORTESIA
Documento non valido ai fini fiscali

Fattura n. ${invoiceNumber}
Data: ${invoiceDate}

EMITTENTE:
Studio di Consulenza AI
Via delle Tecnologie, 123
20129 Milano
P.IVA: 12345678901
Email: contatti@consulenzaai.it

DESTINATARIO:
${data.nome} ${data.cognome}
${data.indirizzo}
${data.cap} ${data.citta}
P.IVA: ${data.partitaIva}
C.F.: ${data.codiceFiscale}

DETTAGLIO SERVIZI:
--------------------------------------------------------
| QTÀ |         DESCRIZIONE         | PREZZO  | TOTALE |
--------------------------------------------------------
|  1  | Consulenza iniziale AI      | € 200,00| € 200,00|
|     | Analisi predittiva          |         |         |
--------------------------------------------------------
|  1  | Setup piattaforma AI        | € 150,00| € 150,00|
|     | per gestione documentale    |         |         |
--------------------------------------------------------
|  1  | Formazione sull'utilizzo    | € 100,00| € 100,00|
|     | degli strumenti AI          |         |         |
--------------------------------------------------------

Imponibile:                         € 450,00
IVA 22%:                            € 99,00
TOTALE FATTURA:                     € 549,00

Modalità di pagamento: Bonifico Bancario
IBAN: IT00A0000000000000000000000
Intestato a: Studio di Consulenza AI
Causale: Fattura n. ${invoiceNumber}

Note:
- Per qualsiasi informazione contattare: supporto@consulenzaai.it
- Contratto generato automaticamente con intelligenza artificiale
- Questo sito e le sue funzionalità sono stati sviluppati in soli 90 minuti con AI

Grazie per aver scelto i nostri servizi innovativi basati su AI!
`;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate documents endpoint
  app.post("/api/generate-documents", async (req: Request, res: Response) => {
    try {
      // Validate request body against schema
      const result = insertDocumentSchema.safeParse({
        ...req.body,
        createdAt: new Date().toISOString()
      });
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: result.error.format() 
        });
      }
      
      // Generazione dei documenti con AI
      const contract = generateAIContract(req.body);
      const invoice = generateCourtesyInvoice(req.body);
      
      // Save document data
      const document = await storage.createDocument(result.data);
      
      // In una implementazione reale, invieremmo questi documenti via email
      // o offriremmo un link per il download
      
      res.status(200).json({ 
        message: "Documenti generati con successo con AI",
        documentId: document.id,
        documents: {
          contract,
          invoice
        }
      });
    } catch (error) {
      console.error("Error generating documents:", error);
      res.status(500).json({ message: "Errore durante la generazione dei documenti" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
