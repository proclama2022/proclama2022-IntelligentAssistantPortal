import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { Send, X, MessageSquareIcon } from "lucide-react";

type Message = {
  id: number;
  text: string;
  isUser: boolean;
};

const PRESET_RESPONSES: Record<string, string> = {
  "ciao": "Ciao! Sono l'assistente virtuale basato sul tariffario ANC. Come posso aiutarti?",
  "tariffario": "Il tariffario ANC fornisce linee guida sui compensi professionali per i commercialisti. Posso fornirti informazioni specifiche su particolari servizi.",
  "compensi": "I compensi per i commercialisti variano in base alla complessità dell'incarico. Per esempio, la tenuta della contabilità semplificata parte da €1.800 annui, mentre una dichiarazione dei redditi per persone fisiche parte da €250.",
  "bilancio": "Per la redazione di un bilancio d'esercizio, il tariffario ANC suggerisce un compenso che parte da €1.000 per le micro imprese fino a €4.000 o più per società di maggiori dimensioni.",
  "consulenza": "Per attività di consulenza generica, l'onorario orario consigliato varia da €80 a €150, in base alla specializzazione e all'esperienza del professionista.",
  "perizia": "Per una perizia tecnica, il compenso può variare da €1.500 a €5.000, in funzione della complessità e del tempo richiesto.",
  "revisione": "Per attività di revisione contabile, il tariffario suggerisce compensi che partono da €2.500 annui per le piccole imprese.",
  "contabilità": "Per la tenuta della contabilità ordinaria, i compensi annui suggeriti partono da €2.500 per le piccole imprese fino a €8.000 o più per le medie imprese.",
  "default": "Mi dispiace, non ho informazioni specifiche su questo argomento. Posso aiutarti con domande relative al tariffario ANC per commercialisti, come compensi per consulenze, bilanci, dichiarazioni fiscali o contabilità."
};

export default function ChatbotSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Ciao! Sono l'assistente virtuale sul tariffario ANC per commercialisti. Come posso aiutarti?", isUser: false }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;
    
    // Add user message
    const newMessages = [...messages, { id: Date.now(), text: input, isUser: true }];
    setMessages(newMessages);
    setInput("");
    
    // Simulate AI response with delay
    setTimeout(() => {
      const response = getResponse(input.toLowerCase());
      setMessages(prev => [...prev, { id: Date.now(), text: response, isUser: false }]);
    }, 1000);
  };

  const getResponse = (text: string): string => {
    // Check for keyword matches in the input
    for (const [keyword, response] of Object.entries(PRESET_RESPONSES)) {
      if (text.includes(keyword)) {
        return response;
      }
    }
    return PRESET_RESPONSES.default;
  };

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
    <>
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

      {/* Chatbot Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed z-50 bottom-5 right-5 w-14 h-14 rounded-full bg-[#1C64F2] text-white flex items-center justify-center shadow-lg hover:bg-[#1C64F2]/90 transition-all ${isOpen ? 'opacity-0' : 'opacity-100'}`}
      >
        <MessageSquareIcon size={24} />
      </button>

      {/* Chatbot Window */}
      <div className={`fixed z-50 bottom-5 right-5 w-80 md:w-96 bg-white rounded-lg shadow-xl transition-transform duration-300 flex flex-col ${isOpen ? 'transform translate-y-0' : 'transform translate-y-[150%]'}`} style={{ height: "28rem" }}>
        {/* Header */}
        <div className="bg-[#1C64F2] text-white p-4 rounded-t-lg flex justify-between items-center">
          <h3 className="font-medium">Assistente Tariffario ANC</h3>
          <button onClick={() => setIsOpen(false)} className="text-white hover:text-white/80">
            <X size={20} />
          </button>
        </div>
        
        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`mb-3 ${msg.isUser ? 'flex justify-end' : 'flex justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${msg.isUser 
                  ? 'bg-[#1C64F2] text-white rounded-tr-none' 
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <div className="border-t p-3 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Scrivi un messaggio..."
            className="flex-1 border rounded-l-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#1C64F2]"
          />
          <button 
            onClick={handleSend}
            className="bg-[#1C64F2] text-white p-2 rounded-r-md hover:bg-[#1C64F2]/90"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </>
  );
}