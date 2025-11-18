import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Download, Clock, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DigitalProduct() {
  const navigate = useNavigate();
  const productPrice = 27;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-8"
        >
          ← Volver al inicio
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🔥 Oferta Limitada - Solo por Hoy
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Guía Completa: Tu Transformación en 30 Días
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              El método exacto que han usado más de 500 mujeres para lograr sus metas de bienestar
            </p>
            <div className="flex items-center justify-center gap-4">
              <span className="text-3xl font-bold text-primary">${productPrice}</span>
              <span className="text-xl text-muted-foreground line-through">$97</span>
              <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                72% OFF
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Lo que vas a recibir:</h2>
              <ul className="space-y-4">
                {[
                  "Plan de alimentación personalizable de 30 días",
                  "50+ recetas saludables y deliciosas",
                  "Rutina de ejercicios (15-30 min diarios)",
                  "Guía de suplementación efectiva",
                  "Sistema de seguimiento y motivación",
                  "Acceso a grupo privado de WhatsApp",
                  "Bonus: Meal prep para la semana",
                  "Actualizaciones GRATIS de por vida"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <div className="space-y-6">
              <Card className="p-6 bg-primary/5 border-2 border-primary">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-bold text-lg">Acceso Instantáneo</p>
                    <p className="text-sm text-muted-foreground">
                      Descarga inmediata después del pago
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-secondary/5 border-2 border-secondary">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-8 h-8 text-secondary" />
                  <div>
                    <p className="font-bold text-lg">Garantía 7 Días</p>
                    <p className="text-sm text-muted-foreground">
                      Si no ves resultados, devolvemos tu dinero
                    </p>
                  </div>
                </div>
              </Card>

              <Button 
                size="lg" 
                className="w-full h-16 text-xl bg-gradient-to-r from-primary to-accent hover:opacity-90"
                onClick={() => window.alert('Integración con Stripe pendiente')}
              >
                <Download className="mr-2 w-6 h-6" />
                Obtener Acceso Ahora - ${productPrice}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                🔒 Pago seguro procesado por Stripe
              </p>
            </div>
          </div>

          <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10">
            <h2 className="text-2xl font-bold mb-6 text-center">
              ¿Por qué esta guía es diferente?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Basado en Ciencia",
                  desc: "Métodos respaldados por estudios y resultados reales"
                },
                {
                  title: "Fácil de Seguir",
                  desc: "Instrucciones claras paso a paso, sin complicaciones"
                },
                {
                  title: "Resultados Probados",
                  desc: "Más de 500 mujeres han transformado sus vidas"
                }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
