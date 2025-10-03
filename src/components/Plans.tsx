import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import nutritionImage from "@/assets/nutrition-plan.jpg";
import communityImage from "@/assets/community.jpg";
import supplementsImage from "@/assets/supplements.jpg";

const plans = [
  {
    title: "Pérdida de Peso",
    image: nutritionImage,
    description: "Alcanza tu peso ideal de forma saludable y sostenible",
    features: [
      "Plan de alimentación personalizado",
      "Recetas saludables y deliciosas",
      "Seguimiento semanal de progreso",
      "Suplementos para acelerar resultados",
      "Acceso a la comunidad exclusiva",
    ],
  },
  {
    title: "Tonificación",
    image: communityImage,
    description: "Define y esculpe tu cuerpo con nuestro programa integral",
    features: [
      "Rutinas de ejercicio específicas",
      "Plan nutricional alto en proteína",
      "Guía de suplementos para músculo",
      "Videos de entrenamiento",
      "Soporte personalizado",
    ],
  },
  {
    title: "Energía y Vitalidad",
    image: supplementsImage,
    description: "Aumenta tu energía y mejora tu calidad de vida",
    features: [
      "Suplementos energizantes naturales",
      "Plan de bienestar integral",
      "Técnicas de manejo del estrés",
      "Optimización del sueño",
      "Nutrición para más energía",
    ],
  },
];

export const Plans = () => {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Elige Tu Camino Hacia
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Una Mejor Versión de Ti
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Programas diseñados para adaptarse a tus metas y estilo de vida
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50"
            >
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
                      <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={scrollToContact}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                >
                  Comenzar Ahora
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
