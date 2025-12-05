import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gift, ShoppingBag, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const MonetizationBanner = () => {
  const navigate = useNavigate();

  return (
    <section id="recursos" className="py-12 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Recursos Para Tu Transformación
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/recursos-gratis')}>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  <Gift className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Recetas Gratis</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  7 recetas deliciosas para perder peso comiendo rico
                </p>
                <Button variant="outline" className="w-full">
                  Descargar Gratis
                </Button>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-primary" onClick={() => navigate('/guia-completa')}>
              <div className="flex flex-col items-center text-center">
                <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-bold">
                  POPULAR
                </span>
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Guía Completa (Starter Kit 7 Días)</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Plan de 7 días + recetas + rutinas y más...
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-primary">$27</span>
                  <span className="text-sm text-muted-foreground line-through">$97</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-accent">
                  Ver Detalles
                </Button>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/consulta-gratis')}>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Consulta Gratis</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  15 minutos personalizados para evaluar tu caso
                </p>
                <Button variant="outline" className="w-full">
                  Agendar Llamada
                </Button>
                <p className="text-xs text-accent mt-2">🔥 Cupos limitados</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
