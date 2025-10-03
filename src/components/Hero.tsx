import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-wellness.jpg";
import logo from "@/assets/logo.png";

export const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-transparent" />
      </div>

      {/* Logo */}
      <div className="absolute top-8 left-8 z-20 animate-fade-in">
        <img src={logo} alt="Ariana Cruz Bienestar y Salud" className="h-20 md:h-24 w-auto" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
            Transforma Tu Vida con
            <span className="block bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Bienestar Total
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed animate-slide-up animation-delay-200">
            Alcanza tus metas de salud con planes personalizados de alimentación, ejercicio y suplementos diseñados especialmente para ti.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-400">
            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-lg text-lg px-8 py-6 rounded-full group"
            >
              Comienza Tu Transformación
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={scrollToContact}
              className="border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300 text-lg px-8 py-6 rounded-full backdrop-blur-sm bg-white/10"
            >
              Contactar Ahora
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};
