import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Gift, CheckCircle2, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function FreebieOffer() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate email submission
    setTimeout(() => {
      toast({
        title: "¡Revisa tu correo!",
        description: "Te hemos enviado el link de descarga. Revisa tu bandeja de entrada.",
      });
      setIsSubmitting(false);
      setEmail("");
    }, 1500);
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
            <span className="inline-block bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🎁 GRATIS - Sin tarjeta de crédito
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Descarga: 7 Recetas para Perder Peso Comiendo Rico
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Recetas deliciosas y nutritivas que te ayudarán a alcanzar tus metas sin sacrificar el sabor
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 order-2 md:order-1">
              <div className="flex items-center gap-3 mb-6">
                <Gift className="w-10 h-10 text-primary" />
                <div>
                  <h2 className="text-2xl font-bold">Lo que incluye:</h2>
                  <p className="text-sm text-muted-foreground">PDF descargable de 25 páginas</p>
                </div>
              </div>
              
              <ul className="space-y-4">
                {[
                  "7 recetas completas paso a paso",
                  "Información nutricional detallada",
                  "Lista de compras para cada receta",
                  "Tips de preparación y almacenamiento",
                  "Substituciones saludables",
                  "Bonus: Guía de porciones perfectas"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Card className="mt-8 p-4 bg-primary/5 border-2 border-primary">
                <p className="text-sm text-center">
                  <strong>Más de 1,200 personas</strong> ya han descargado estas recetas y están viendo resultados increíbles
                </p>
              </Card>
            </Card>

            <div className="space-y-6 order-1 md:order-2">
              <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary">
                <div className="flex items-center gap-3 mb-6">
                  <Mail className="w-10 h-10 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold">Descarga Instantánea</h3>
                    <p className="text-sm text-muted-foreground">
                      Te lo enviamos directo a tu correo
                    </p>
                  </div>
                </div>

                <form onSubmit={handleDownload} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-base font-semibold mb-2 block">
                      Tu Correo Electrónico
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="h-12"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-14 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    {isSubmitting ? "Enviando..." : "Descargar GRATIS Ahora"}
                    <Download className="ml-2 w-5 h-5" />
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    🔒 Tu información es privada. No spam, lo prometo.
                  </p>
                </form>
              </Card>

              <Card className="p-6 bg-secondary/5">
                <h4 className="font-bold mb-3">¿Por qué estas recetas funcionan?</h4>
                <p className="text-sm text-muted-foreground">
                  Están diseñadas por una nutricionista certificada y son ideales para personas ocupadas que quieren comer saludable sin pasar horas en la cocina.
                </p>
              </Card>
            </div>
          </div>

          <Card className="p-8 bg-gradient-to-br from-accent/10 to-primary/10 text-center">
            <h3 className="text-2xl font-bold mb-4">
              🎯 También recibirás consejos semanales GRATIS
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Te enviaré tips, recetas exclusivas y motivación directamente a tu correo. 
              Puedes darte de baja cuando quieras (pero no lo harás 😉)
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
