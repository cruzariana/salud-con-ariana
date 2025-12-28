import { Check, Gift, Sparkles, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "./CountdownTimer";

export const NewYearPromo = () => {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  const benefits = [
    "Detox guiado incluido",
    "Alimentación estructurada",
    "Ejercicios online con entrenadores",
    "Mindset y hábitos saludables",
    "Comunidad de apoyo y talleres",
    "Suplementación personalizada"
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-secondary/30 via-background to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/8 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-sm font-medium border border-primary/20">
            <Sparkles className="w-4 h-4" />
            Programa Exclusivo 2026
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight">
              Inicia este{" "}
              <span className="text-primary font-bold">2026</span>
              <br />
              con{" "}
              <span className="italic text-primary">Energía y Bienestar</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Un programa de acompañamiento online para comenzar el año con más energía, enfoque y bienestar integral.
            </p>
          </div>

          {/* Benefits grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl px-4 py-3 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Limited time offer box with countdown */}
          <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-primary font-semibold">
              <Gift className="w-5 h-5" />
              <span className="uppercase tracking-wider text-sm">Oferta por tiempo limitado</span>
            </div>
            
            {/* Countdown Timer */}
            <div className="py-2">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                <Clock className="w-4 h-4" />
                <span>La oferta termina en:</span>
              </div>
              <CountdownTimer />
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              <span className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold shadow-md">
                Envío GRATIS
              </span>
              <span className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold shadow-md">
                Membresía GRATIS
              </span>
              <span className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold shadow-md">
                Detox GRATIS
              </span>
            </div>
          </div>

          {/* Start date */}
          <div className="flex items-center justify-center gap-3 text-lg font-semibold text-foreground">
            <Calendar className="w-5 h-5 text-primary" />
            <span>Inicio del programa:</span>
            <span className="text-primary">12 de enero de 2026</span>
          </div>

          {/* CTA */}
          <div className="space-y-4 pt-4">
            <Button 
              onClick={scrollToContact}
              size="lg"
              className="text-lg px-10 py-7 bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              QUIERO COMENZAR MI 2026 DIFERENTE
            </Button>
            <p className="text-sm text-muted-foreground italic max-w-md mx-auto">
              No es una dieta extrema. Es un comienzo con guía, acompañamiento y comunidad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
