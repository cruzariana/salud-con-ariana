import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Download, Clock, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import FAQ from "@/components/FAQ";

export default function DigitalProduct() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const productPrice = 27;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCheckout = async () => {
    if (!email) {
      toast({
        title: "Email requerido",
        description: "Por favor ingresa tu email para continuar con la compra.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: { email, name },
      });

      if (error) throw error;

      if (data?.url) {
        // Open Stripe checkout in new tab
        window.open(data.url, "_blank");
      } else {
        throw new Error("No se recibió URL de checkout");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "Error al procesar",
        description: "Hubo un problema al crear tu sesión de pago. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            <div className="flex justify-center mb-4">
              <Badge variant="destructive" className="text-sm px-4 py-2">
                💸 Precio especial por tiempo limitado
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Transformación Giro180 Starter Kit: Mini Sistema de 7 Días
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              El mismo método comprobado que ya usan más de 500 mujeres — ahora en versión de arranque para comenzar hoy mismo.
            </p>
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-4xl font-bold text-primary">${productPrice}</span>
              <span className="text-2xl text-muted-foreground line-through">$97</span>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground mb-1">Valor real: <span className="line-through">$97</span></p>
              <p className="text-2xl font-bold text-accent">🎉 Ahorra $70</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Incluye:</h2>
              <ul className="space-y-4">
                {[
                  "Plan de Alimentación 7 Días completos (menús balanceados + calorías controladas)",
                  "Lista de compras y sustitutos organizados",
                  "Recetas fáciles, deliciosas y nutritivas",
                  "Rutinas de 20-30 minutos (ejercicios efectivos)",
                  "Guía de Suplementación personalizada según tu meta",
                  "Meal Prep Plan (estrategias para organizar tus comidas)",
                  "Plantilla de seguimiento de progreso",
                  "Roadmap para unirte al Sistema Completo de 30 Días"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <span className="text-sm">{item}</span>
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

              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Tu nombre (opcional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12"
                />
                <Input
                  type="email"
                  placeholder="Tu email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
                <Button
                  size="lg" 
                  className="w-full h-16 text-xl bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 w-6 h-6 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 w-6 h-6" />
                      Obtener Acceso Ahora - ${productPrice}
                    </>
                  )}
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                🔒 Pago seguro procesado por Stripe
              </p>
            </div>
          </div>

          {/* Metodología Section */}
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">
              El Método Giro180 - Filosofía de Bienestar
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {[
                {
                  icon: "🌱",
                  title: "Alimentación Consciente",
                  desc: "Porciones correctas, alimentos naturales y altos en proteína para mantener músculo"
                },
                {
                  icon: "💪",
                  title: "Movimiento Diario",
                  desc: "Mínimo 20 minutos de ejercicio mixto adaptado a tu nivel"
                },
                {
                  icon: "🎯",
                  title: "Suplementación Inteligente",
                  desc: "Productos específicos para maximizar resultados y longevidad"
                }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center pt-6 border-t">
              <p className="text-lg font-semibold mb-2">Resultados Promedio en 7 Días:</p>
              <div className="flex justify-center gap-8 text-center">
                <div>
                  <p className="text-3xl font-bold text-primary">2-3 lbs</p>
                  <p className="text-sm text-muted-foreground">Pérdida de peso</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">1-2"</p>
                  <p className="text-sm text-muted-foreground">Reducción de pulgadas</p>
                </div>
              </div>
            </div>
          </Card>


          {/* FAQ Section */}
          <FAQ />

          {/* Why Different */}
          <Card className="p-8 bg-gradient-to-br from-secondary/10 to-accent/10 mt-12">
            <h2 className="text-2xl font-bold mb-6 text-center">
              ¿Por qué elegir el Starter Kit Giro180?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Sistema Probado",
                  desc: "El mismo método que uso con mis clientes de coaching privado"
                },
                {
                  title: "Filosofía de Bienestar",
                  desc: "Longevidad y bienestar integral, no dietas extremas ni privación"
                },
                {
                  title: "Resultados Reales",
                  desc: "500+ mujeres han logrado sus metas de peso y pulgadas"
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
