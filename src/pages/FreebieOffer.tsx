import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Mail, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function FreebieOffer() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Guardar email en base de datos
      const { error: dbError } = await supabase
        .from('leads')
        .insert([{ 
          email, 
          source: 'freebie_offer',
          submitted: true 
        }]);

      if (dbError) {
        console.error("Error saving to database:", dbError);
      }

      // Enviar email con las recetas
      const { error: emailError } = await supabase.functions.invoke('send-freebie-email', {
        body: { email, name: email.split('@')[0] }
      });

      if (emailError) {
        console.error("Error sending email:", emailError);
        throw emailError;
      }

      toast({
        title: "¡Enviado! 🎉",
        description: "Revisa tu email - te enviamos tus 7 recetas gratis.",
      });
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Hubo un problema. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🎁 Totalmente GRATIS
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            7 Recetas Saludables para Empezar Tu Transformación
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Recetas rápidas, deliciosas y altas en proteína para tu bienestar
          </p>

          <Card className="p-8 max-w-md mx-auto bg-card/50 backdrop-blur">
            <form onSubmit={handleDownload} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-14 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90"
                disabled={isSubmitting}
              >
                <Mail className="mr-2 w-5 h-5" />
                {isSubmitting ? "Enviando..." : "Recibir Recetas Gratis"}
              </Button>
              <p className="text-xs text-muted-foreground">
                Sin spam. Solo contenido de valor para tu bienestar.
              </p>
            </form>
          </Card>
        </div>

        {/* What You'll Get */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Lo que vas a recibir:
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: "🥗",
                title: "7 Recetas Completas",
                desc: "2 desayunos, 2 almuerzos, 2 cenas y 1 snack. Cada receta incluye: ingredientes, pasos detallados, valores nutricionales, tips de sustitución."
              },
              {
                icon: "⚡",
                title: "Rápidas de Preparar",
                desc: "5-25 minutos máximo por receta"
              },
              {
                icon: "💪",
                title: "Altas en Proteína",
                desc: "Para mantenerte satisfecha y energizada"
              }
            ].map((item, i) => (
              <Card key={i} className="p-6 text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="max-w-3xl mx-auto mt-16">
          <Card className="p-8 text-center bg-gradient-to-br from-primary/10 to-secondary/10">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">
              ¿Lista para comenzar tu transformación?
            </h3>
            <p className="text-muted-foreground mb-6">
              Estas 7 recetas son solo el comienzo. Descarga nuestra Guía Completa de 30 Días con plan de alimentación, rutinas de ejercicio y sistema de seguimiento.
            </p>
            <Button 
              size="lg"
              asChild
              className="mb-4"
            >
              <a href="https://ariana-cruz.com/guia-completa" target="_blank" rel="noopener noreferrer">
                Ver Guía Completa - $27
              </a>
            </Button>
            <p className="text-xs text-muted-foreground">
              Más de 500 mujeres ya han transformado sus vidas con este método
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
