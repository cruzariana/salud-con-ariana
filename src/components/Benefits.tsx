import { Heart, Users, Dumbbell, Zap, Gift } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Nutrición Personalizada",
    description: "Planes de alimentación 100% adaptados a tus necesidades, objetivos y estilo de vida. Diseñamos tu menú considerando tus preferencias, alergias, horarios y metas específicas para que logres resultados sostenibles.",
    details: "Incluye ajustes mensuales según tu progreso",
  },
  {
    icon: Users,
    title: "Comunidad de Apoyo",
    description: "Únete a una red vibrante de mujeres comprometidas con su bienestar y transformación personal. Comparte experiencias, recetas, motivación y celebra cada logro en un ambiente positivo y sin juicios.",
    details: "Acceso a grupo privado y sesiones grupales",
  },
  {
    icon: Dumbbell,
    title: "Rutinas de Ejercicio",
    description: "Programas de entrenamiento personalizados diseñados para todos los niveles de condición física. Desde principiantes hasta avanzados, con rutinas que se adaptan a tu tiempo disponible y equipo que tengas en casa o gym.",
    details: "Videos demostrativos y seguimiento semanal",
  },
  {
    icon: Zap,
    title: "Suplementos Premium",
    description: "Productos Shaklee de máxima calidad respaldados por ciencia para potenciar tu energía, recuperación y resultados. Suplementación estratégica que complementa tu nutrición y acelera tu transformación de manera saludable.",
    details: "Recomendaciones personalizadas según tus necesidades",
  },
  {
    icon: Gift,
    title: "Programa de Lealtad",
    description: "Por mantener tu orden mensual en auto-envío, ganas un punto por cada dólar gastado que luego puedes redimir en productos. Mientras más constante seas con tu transformación, más beneficios obtienes.",
    details: "Acumula puntos y obtén productos gratis",
  },
];

export const Benefits = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Todo Lo Que Necesitas Para Triunfar
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Un enfoque completo para alcanzar tus metas de salud y bienestar
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 group cursor-pointer flex flex-col"
              onClick={() => {
                const plansSection = document.getElementById('planes');
                if (plansSection) {
                  plansSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4 flex-grow">
                {benefit.description}
              </p>
              <p className="text-sm text-primary/80 font-medium mb-4">
                ✨ {benefit.details}
              </p>
              <Button 
                variant="ghost" 
                className="w-full group-hover:bg-primary group-hover:text-white transition-all mt-auto"
              >
                Ver Planes
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
