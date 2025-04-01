export default function Footer() {
  return (
    <footer id="contact" className="bg-primary text-white py-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold font-montserrat mb-2">AI Per Commercialisti</h2>
            <p className="text-white text-opacity-80">Trasforma il tuo studio professionale con l'AI</p>
          </div>
          
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold font-montserrat mb-3">Contatti</h3>
            <p className="flex items-center">
              <i className="fas fa-envelope mr-2"></i>
              <a href="mailto:rosario.emmi@proclama.co" className="hover:text-accent transition-colors">
                rosario.emmi@proclama.co
              </a>
            </p>
          </div>
          
          <div>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/rosarioemmi/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="LinkedIn">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white border-opacity-20 text-center text-sm text-white text-opacity-70">
          <p>&copy; {new Date().getFullYear()} AI Per Commercialisti. Tutti i diritti riservati.</p>
          <div className="mt-2">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-accent transition-colors">Termini e Condizioni</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
