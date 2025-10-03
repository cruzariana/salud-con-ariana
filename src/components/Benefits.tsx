import { Heart, Users, Dumbbell, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const benefits = [
  {
    icon: Heart,
    title: "Nutrición Personalizada",
    description: "Planes de alimentación adaptados a tus necesidades y objetivos específicos.",
  },
  {
    icon: Users,
    title: "Comunidad de Apoyo",
    description: "Únete a una red de mujeres comprometidas con su bienestar y transformación.",
  },
  {
    icon: Dumbbell,
    title: "Rutinas de Ejercicio",
    description: "Programas de entrenamiento diseñados para todos los niveles de condición física.",
  },
  {
    icon: Zap,
    title: "Suplementos Premium",
    description: "Productos Shaklee de alta calidad para potenciar tu energía y resultados.",
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
