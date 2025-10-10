import { Card } from "@/components/ui/card";
import { Users, Heart, TrendingUp, Award } from "lucide-react";
import communityImage from "@/assets/community-giro180.jpeg";

export const Community = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Únete a Nuestra Comunidad
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Más de 2,762 mujeres ya están transformando sus vidas
            </p>
            <div className="inline-block bg-primary/10 text-primary px-8 py-4 rounded-full">
              <p className="text-3xl md:text-4xl font-bold">2,762+</p>
              <p className="text-sm md:text-base">Miembros Activos</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <img 
                src={communityImage} 
                alt="Comunidad GIRO 180 - Mujeres transformando sus vidas juntas" 
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Comunidad Exclusiva GIRO 180
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Al unirte a nuestro programa, obtienes acceso inmediato a nuestra comunidad privada en Facebook y WhatsApp, donde encontrarás:
                </p>
              </div>

              <div className="grid gap-4">
                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3">
                    <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Apoyo Constante</h4>
                      <p className="text-sm text-muted-foreground">
                        Seguimiento personalizado de tus metas y auto-envíos
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3">
                    <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Motivación Diaria</h4>
                      <p className="text-sm text-muted-foreground">
                        Talleres de mindset y motivación constante
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Planes Personalizados</h4>
                      <p className="text-sm text-muted-foreground">
                        Planes de alimentación y ejercicio adaptados a ti
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3">
                    <Award className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Comunidad Exclusiva</h4>
                      <p className="text-sm text-muted-foreground">
                        Acceso privado a Facebook y WhatsApp con mujeres como tú
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-6">
              No estás sola en este camino. Nuestra comunidad te apoyará en cada paso.
            </p>
            <a 
              href="#contacto" 
              className="inline-block bg-gradient-to-r from-primary to-accent text-white font-bold px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
            >
              Quiero Unirme a la Comunidad
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
