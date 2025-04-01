export default function TimelineSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-primary mb-3">90 Minuti di AI: Teoria in Pratica</h2>
          <p className="text-foreground max-w-2xl mx-auto">Trasforma il tuo modo di lavorare in soli 90 minuti attraverso un processo guidato in tre semplici fasi</p>
        </div>
        
        <div className="timeline-container flex flex-col md:flex-row justify-between items-start md:items-center mb-12 relative">
          {/* Timeline connector line - desktop only */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
          
          {/* Step 1 */}
          <div className="timeline-step w-full md:w-1/3 p-4 timeline-animation">
            <div className="bg-white rounded-lg shadow-md p-6 relative z-10 border-t-4" style={{borderTopColor: "#4A90E2"}}>
              <div className="w-12 h-12 text-white rounded-full flex items-center justify-center mb-4 mx-auto" style={{backgroundColor: "#4A90E2"}}>
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3 className="text-xl font-semibold font-montserrat text-center mb-2">Fase 1: Ideazione con AI</h3>
              <p className="text-center text-gray-600 mb-3">Impara a formulare prompt efficaci per generare idee innovative</p>
              <div className="bg-gray-100 rounded-full p-1 text-center text-sm font-medium text-primary">
                30 minuti
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="timeline-step w-full md:w-1/3 p-4 timeline-animation" style={{transitionDelay: "0.2s"}}>
            <div className="bg-white rounded-lg shadow-md p-6 relative z-10 border-t-4" style={{borderTopColor: "#50E3C2"}}>
              <div className="w-12 h-12 text-white rounded-full flex items-center justify-center mb-4 mx-auto" style={{backgroundColor: "#50E3C2"}}>
                <i className="fas fa-code"></i>
              </div>
              <h3 className="text-xl font-semibold font-montserrat text-center mb-2">Fase 2: Sviluppo con Replit Agents</h3>
              <p className="text-center text-gray-600 mb-3">Costruisci soluzioni pratiche con agenti AI senza necessità di programmazione</p>
              <div className="bg-gray-100 rounded-full p-1 text-center text-sm font-medium text-primary">
                30 minuti
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="timeline-step w-full md:w-1/3 p-4 timeline-animation" style={{transitionDelay: "0.4s"}}>
            <div className="bg-white rounded-lg shadow-md p-6 relative z-10 border-t-4" style={{borderTopColor: "#B06ADB"}}>
              <div className="w-12 h-12 text-white rounded-full flex items-center justify-center mb-4 mx-auto" style={{backgroundColor: "#B06ADB"}}>
                <i className="fas fa-robot"></i>
              </div>
              <h3 className="text-xl font-semibold font-montserrat text-center mb-2">Fase 3: Automazione con Make.com</h3>
              <p className="text-center text-gray-600 mb-3">Automatizza processi ripetitivi integrando le tue soluzioni con i sistemi esistenti</p>
              <div className="bg-gray-100 rounded-full p-1 text-center text-sm font-medium text-primary">
                30 minuti
              </div>
            </div>
          </div>
        </div>
        
        {/* Comparison box */}
        <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto badge">
          <h3 className="text-xl font-semibold font-montserrat text-center mb-4">Confronto Metodi</h3>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0 md:w-1/2 p-4">
              <h4 className="font-semibold mb-2 text-center">Metodo Tradizionale</h4>
              <div className="bg-gray-100 rounded-lg p-4 h-full">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Ricerca di soluzioni: 3-5 giorni</li>
                  <li>Sviluppo progetto: 1-2 settimane</li>
                  <li>Implementazione: 2-3 giorni</li>
                  <li>Costi elevati di consulenza</li>
                  <li>Dipendenza da sviluppatori esterni</li>
                </ul>
                <p className="font-bold text-red-500 mt-4 text-center">Totale: 2-3 settimane</p>
              </div>
            </div>
            
            <div className="md:w-1/2 p-4">
              <h4 className="font-semibold mb-2 text-center">Metodo AI</h4>
              <div className="bg-accent bg-opacity-10 rounded-lg p-4 border border-accent h-full">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Ideazione con AI: 30 minuti</li>
                  <li>Sviluppo con Replit: 30 minuti</li>
                  <li>Automazione: 30 minuti</li>
                  <li>Controllo completo sul processo</li>
                  <li>Personalizzazione immediata</li>
                </ul>
                <p className="font-bold text-accent mt-4 text-center">Totale: 90 minuti</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
