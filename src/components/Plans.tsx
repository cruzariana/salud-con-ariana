import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import weightLossImage from "@/assets/weight-loss-plan.jpg";
import toningImage from "@/assets/toning-plan.jpg";
import energyImage from "@/assets/energy-plan.jpg";

const plans = [
  {
    title: "Pérdida de Peso",
    image: weightLossImage,
    description: "Elimina el exceso de peso de forma saludable y sostenible con suplementos especializados para acelerar tu metabolismo.",
    features: [
      "Plan de alimentación balanceada personalizado",
      "Rutinas de ejercicio adaptadas a tu ritmo",
      "Suplementos premium para quemar grasa",
      "Seguimiento semanal de progreso",
      "Acceso a comunidad exclusiva GIRO 180"
    ],
    highlight: "Ideal para perder 20-50+ lbs"
  },
  {
    title: "Tonificación",
    image: toningImage,
    description: "Define y fortalece tu cuerpo mientras reduces grasa con suplementos específicos para desarrollo muscular magro.",
    features: [
      "Ejercicios de resistencia y cardio dirigidos",
      "Nutrición alta en proteínas balanceada",
      "Suplementos para tonificación muscular",
      "Guías de técnica y forma correcta",
      "Acceso a comunidad exclusiva GIRO 180"
    ],
    highlight: "Perfecto para definir"
  },
  {
    title: "Energía y Vitalidad",
    image: energyImage,
    description: "Recupera tu energía y siéntete radiante cada día con suplementos naturales que revitalizan tu cuerpo.",
    features: [
      "Nutrición energizante y revitalizante",
      "Rutinas de ejercicio que aumentan vitalidad",
      "Suplementos naturales para energía sostenida",
      "Técnicas de manejo de estrés y mindset",
      "Acceso a comunidad exclusiva GIRO 180"
    ],
    highlight: "Recupera tu vitalidad"
  }
];

export const Plans = () => {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="planes" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Planes Diseñados Para Ti
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            Cada plan incluye suplementos especializados según tu meta específica
          </p>
          <div className="inline-block bg-primary/10 text-primary px-6 py-3 rounded-full">
            <p className="text-lg font-bold">Desde $179 - Incluye Envío y Membresía GRATIS</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 relative"
            >
              {/* Badge de destacado */}
              <div className="absolute top-4 right-4 z-10 bg-accent text-white px-3 py-1 rounded-full text-sm font-bold">
                {plan.highlight}
              </div>

              <div 
                className="h-56 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${plan.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-bold text-white">{plan.title}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-muted-foreground mb-6">
                  {plan.description}
                </p>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={scrollToContact}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                >
                  Quiero Este Plan
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
