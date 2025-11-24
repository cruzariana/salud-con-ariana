import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Download, Clock, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import recipeSmoothieBowl from "@/assets/recipe-smoothie-bowl.jpg";
import recipeOmelet from "@/assets/recipe-omelet.jpg";
import recipeChickenSalad from "@/assets/recipe-chicken-salad.jpg";
import recipeQuinoaBowl from "@/assets/recipe-quinoa-bowl.jpg";
import recipeSalmonDinner from "@/assets/recipe-salmon-dinner.jpg";
import recipeTurkeyStirf from "@/assets/recipe-turkey-stirfry.jpg";
import recipeYogurtParfait from "@/assets/recipe-yogurt-parfait.jpg";
import energyPlan from "@/assets/energy-plan.jpg";
import toningPlan from "@/assets/toning-plan.jpg";
import weightLossPlan from "@/assets/weight-loss-plan.jpg";
import supplementsImg from "@/assets/supplements.jpg";

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
              🔥 Oferta Limitada - Acceso Instantáneo
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Transformación Giro180: Tu Sistema Completo de 30 Días
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              El mismo sistema que usan más de 500 mujeres en mi programa de coaching para perder 5-10 libras y reducir pulgadas en solo 30 días
            </p>
            <div className="flex items-center justify-center gap-4">
              <span className="text-3xl font-bold text-primary">${productPrice}</span>
              <span className="text-xl text-muted-foreground line-through">$179</span>
              <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                Ahorra $152
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Precio especial del paquete de inicio • Valor real $179+
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Sistema Completo Incluye:</h2>
              <ul className="space-y-4">
                {[
                  "📅 Plan de Alimentación 30 Días - 4 semanas de menús completos con listas de compras",
                  "🍽️ 20+ Recetas Balanceadas - Desayunos, almuerzos, cenas y snacks nutritivos",
                  "💪 Rutinas de Ejercicio Mixtas - Cardio, fuerza, piernas, brazos y glúteos (20-30 min)",
                  "💊 Guía de Suplementación - Cómo maximizar resultados con los productos correctos",
                  "📊 Sistema de Seguimiento - Plantillas para medir progreso y mantener motivación",
                  "🥗 Guía de Meal Prep - Prepara comidas de la semana en 2 horas",
                  "🔄 Opciones de Sustitución - Alternativas para cada receta según tus preferencias",
                  "🎯 Resultados Comprobados - El mismo método de mi programa Giro180"
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

              <Button
                size="lg" 
                className="w-full h-16 text-xl bg-gradient-to-r from-primary to-accent hover:opacity-90"
                asChild
              >
                <a href="https://buy.stripe.com/5kQbJ0enT60p3mG4Pc5J602" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 w-6 h-6" />
                  Obtener Acceso Ahora - ${productPrice}
                </a>
              </Button>

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
              <p className="text-lg font-semibold mb-2">Resultados Promedio en 30 Días:</p>
              <div className="flex justify-center gap-8 text-center">
                <div>
                  <p className="text-3xl font-bold text-primary">5-10 lbs</p>
                  <p className="text-sm text-muted-foreground">Pérdida de peso</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">2-4"</p>
                  <p className="text-sm text-muted-foreground">Reducción de pulgadas</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Visual Content Preview */}
          <Card className="p-8 mb-12 bg-gradient-to-br from-primary/5 to-secondary/5">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Lo Que Recibirás en Tu Guía Completa
            </h2>
            
            {/* Recipe Collage */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-center">20+ Recetas Balanceadas</h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {[
                  recipeSmoothieBowl, recipeOmelet, recipeChickenSalad, recipeQuinoaBowl,
                  recipeSalmonDinner, recipeTurkeyStirf, recipeYogurtParfait, recipeChickenSalad
                ].map((img, i) => (
                  <div key={i} className="relative overflow-hidden rounded-lg shadow-md aspect-square">
                    <img 
                      src={img} 
                      alt={`Receta ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Exercise & Supplements Collage */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-center">Rutinas de Ejercicio</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[energyPlan, toningPlan, weightLossPlan, energyPlan].map((img, i) => (
                    <div key={i} className="relative overflow-hidden rounded-lg shadow-md aspect-video">
                      <img 
                        src={img} 
                        alt={`Ejercicio ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-center">Guía de Suplementación</h3>
                <div className="relative overflow-hidden rounded-lg shadow-md">
                  <img 
                    src={supplementsImg} 
                    alt="Guía de Suplementación"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-3 text-center">
                  Aprende qué productos usar y cómo combinarlos para mejores resultados. Explora los paquetes disponibles en nuestra página.
                </p>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6 italic">
              + Sistema de seguimiento con plantillas de progreso y listas de compras semanales
            </p>
          </Card>

          {/* Why Different */}
          <Card className="p-8 bg-gradient-to-br from-secondary/10 to-accent/10">
            <h2 className="text-2xl font-bold mb-6 text-center">
              ¿Por qué elegir Transformación Giro180?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Sistema Probado",
                  desc: "El mismo método que uso con mis clientes de coaching privado ($179+ valor)"
                },
                {
                  title: "Filosofía de Bienestar",
                  desc: "Longevidad y bienestar integral, no dietas extremas ni privación"
                },
                {
                  title: "Resultados Reales",
                  desc: "500+ mujeres han logrado sus metas de peso y pulgadas en 30 días"
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
