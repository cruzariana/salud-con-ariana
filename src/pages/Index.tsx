import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Plans } from "@/components/Plans";
import { AboutMe } from "@/components/AboutMe";
import { Testimonials } from "@/components/Testimonials";
import { ContactForm } from "@/components/ContactForm";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Benefits />
      <AboutMe />
      <Testimonials />
      <Plans />
      <ContactForm />
      
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm opacity-80 mb-4">
              © 2024 Ariana Cruz. Todos los derechos reservados.
            </p>
            <div className="flex justify-center gap-6 text-xs opacity-60">
              <Link to="/privacidad" className="hover:opacity-100 transition-opacity">Política de Privacidad</Link>
              <span>|</span>
              <Link to="/terminos" className="hover:opacity-100 transition-opacity">Términos y Condiciones</Link>
              <span>|</span>
              <Link to="/descargo" className="hover:opacity-100 transition-opacity">Descargo de Responsabilidad</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
