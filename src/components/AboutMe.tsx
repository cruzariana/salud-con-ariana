import { Card } from "@/components/ui/card";
import { Heart, Target, Award } from "lucide-react";

export const AboutMe = () => {
  return (
    <section id="sobre-mi" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Conoce a Ariana Cruz
            </h2>
            <p className="text-xl text-muted-foreground">
              Tu guía hacia una vida más saludable y plena
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hola, soy <span className="font-bold text-primary">Ariana Cruz</span>, y mi pasión es ayudar a mujeres como tú a alcanzar sus metas de salud y bienestar.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Después de mi propia transformación, descubrí el poder de combinar nutrición adecuada, ejercicio constante y suplementos de calidad. Hoy dedico mi vida a compartir este conocimiento.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Mi enfoque es personalizado y holístico: no solo te ayudo a perder peso o tonificar tu cuerpo, sino a crear hábitos sostenibles que transformarán tu vida para siempre.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="p-6 border-2 border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Mi Misión</h3>
                    <p className="text-muted-foreground">
                      Empoderar a cada mujer para que descubra su mejor versión a través del bienestar integral.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 border-secondary/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Mi Enfoque</h3>
                    <p className="text-muted-foreground">
                      Planes personalizados que se adaptan a tu estilo de vida, no al revés.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 border-accent/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Mi Compromiso</h3>
                    <p className="text-muted-foreground">
                      Apoyo constante en cada paso de tu transformación.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};