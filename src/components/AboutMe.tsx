import { Card } from "@/components/ui/card";
import { Heart, Target, Award } from "lucide-react";
import arianaTransformation from "@/assets/ariana-transformation.png";
import arianaTransformationAngles from "@/assets/ariana-transformation-angles.jpeg";
import arianaProfile from "@/assets/ariana-new-photo.jpeg";

export const AboutMe = () => {
  return (
    <section id="sobre-mi" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Conoce a Ariana Cruz
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Embajadora de Bienestar y Salud
            </p>
            
            {/* Foto elegante centrada */}
            <div className="max-w-md mx-auto mb-16">
              <img 
                src={arianaProfile} 
                alt="Ariana Cruz - Embajadora de Bienestar y Salud" 
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>

          {/* Historia y foto de transformación lado a lado */}
          <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Soy <span className="font-bold text-primary">Ariana Cruz</span>, Embajadora de Bienestar y Salud, apasionada por ayudar a otros a transformar su vida desde adentro hacia afuera. Mi camino comenzó con una meta personal: recuperar mi energía, mi autoestima y mi confianza.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A través de disciplina, apoyo, cambios de hábitos y la integración de productos naturales y efectivos, logré una transformación real: <span className="font-bold text-primary">perdí 30 lb</span> y gané una nueva versión de mí misma, más saludable, fuerte y plena.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hoy, esa experiencia se ha convertido en mi misión. Acompaño a otras personas en su proceso, guiándolas con empatía y herramientas prácticas para que también logren resultados duraderos.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Creo firmemente que el bienestar no es solo físico, sino también mental y emocional, y que pequeños pasos consistentes pueden producir cambios extraordinarios.
              </p>
            </div>

            <div className="relative">
              <img 
                src={arianaTransformation} 
                alt="Transformación de Ariana Cruz - Antes y después de perder 30 libras" 
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>

          {/* Foto de múltiples ángulos abajo */}
          <div className="mb-16">
            <img 
              src={arianaTransformationAngles} 
              alt="Transformación de Ariana Cruz - Múltiples ángulos mostrando resultados" 
              className="rounded-lg shadow-2xl w-full h-auto"
            />
          </div>

          <div className="md:col-span-2">
            <div className="grid md:grid-cols-3 gap-6">
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

          {/* CTA suave al final de la historia */}
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl">
            <p className="text-2xl font-bold text-foreground mb-4">
              Si yo pude, tú también puedes. Empieza hoy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};