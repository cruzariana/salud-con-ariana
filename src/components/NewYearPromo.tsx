import { Check, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import promoImage from "@/assets/promo-2026.png";

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
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={promoImage} 
                  alt="Programa de bienestar 2026" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 space-y-6">
              {/* Title */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  Programa 2026
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight">
                  Inicia este <span className="text-primary font-bold">2026</span> con{" "}
                  <span className="italic text-primary">Energía y Bienestar</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Un programa de acompañamiento online para comenzar el año con más energía, enfoque y bienestar integral.
                </p>
              </div>

              {/* Benefits list */}
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Limited time offer box */}
              <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <Gift className="w-5 h-5" />
                  <span className="uppercase tracking-wide text-sm">Oferta por tiempo limitado – hasta el 29 de diciembre</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-sm font-medium">
                    Envío GRATIS
                  </span>
                  <span className="bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-sm font-medium">
                    Membresía GRATIS
                  </span>
                  <span className="bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-sm font-medium">
                    Detox GRATIS
                  </span>
                </div>
              </div>

              {/* Start date */}
              <p className="text-lg font-semibold text-foreground">
                📅 Inicio del programa: <span className="text-primary">12 de enero de 2026</span>
              </p>

              {/* CTA */}
              <div className="space-y-3 pt-2">
                <Button 
                  onClick={scrollToContact}
                  size="lg"
                  className="w-full md:w-auto text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  QUIERO COMENZAR MI 2026 DIFERENTE
                </Button>
                <p className="text-sm text-muted-foreground italic">
                  No es una dieta extrema. Es un comienzo con guía, acompañamiento y comunidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
