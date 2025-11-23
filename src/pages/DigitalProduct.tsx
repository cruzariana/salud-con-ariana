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
              🔥 Oferta Limitada - Acceso Instantáneo
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Transformación Giro180: Sistema Completo de 30 Días
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
                  "🍽️ 20+ Recetas Shaklee - Desayunos, almuerzos, cenas y snacks balanceados",
                  "💪 Rutinas de Ejercicio Mixtas - Cardio, fuerza, piernas, brazos y glúteos (20-30 min)",
                  "💊 Guía de Suplementación Shaklee - Life Shake, Trim, Burn, BioCell, Detox 7-Day, Probióticos y Multivitaminas",
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

          {/* Metodología Section */}
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">
              El Método Giro180 - Filosofía Shaklee
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
                  desc: "Productos Shaklee específicos para maximizar resultados y longevidad"
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

          {/* Sample Week Preview */}
          <Card className="p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Ejemplo de Semana 1 - Plan de Alimentación
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { meal: "Desayuno", example: "Smoothie Bowl Energético con Life Shake" },
                { meal: "Almuerzo", example: "Ensalada de Pollo a la Parrilla" },
                { meal: "Snack PM", example: "Parfait Proteico con Yogurt Griego" },
                { meal: "Cena", example: "Salmón al Horno con Vegetales Asados" }
              ].map((item, i) => (
                <Card key={i} className="p-4 bg-muted/50">
                  <p className="font-semibold mb-2">{item.meal}</p>
                  <p className="text-sm text-muted-foreground">{item.example}</p>
                </Card>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              + Guía completa de meal prep, listas de compras y opciones de sustitución
            </p>
          </Card>

          {/* Supplement Guide Preview */}
          <Card className="p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Guía de Suplementación Shaklee Incluida
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  product: "Life Shake",
                  use: "Base proteica diaria",
                  benefit: "24g proteína, vitaminas y minerales esenciales"
                },
                {
                  product: "Trim & Burn",
                  use: "Apoyo metabólico",
                  benefit: "Acelera metabolismo y quema de grasa natural"
                },
                {
                  product: "Detox 7-Day Cleanse",
                  use: "Limpieza inicial",
                  benefit: "Resetea tu sistema digestivo"
                },
                {
                  product: "Probióticos + Multivitaminas",
                  use: "Salud integral",
                  benefit: "Inmunidad y digestión óptima"
                },
                {
                  product: "BioCell Collagen",
                  use: "Piel y articulaciones",
                  benefit: "Mantén elasticidad y movilidad"
                }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="font-bold text-primary">{item.product}</h3>
                  <p className="text-sm"><span className="font-semibold">Uso:</span> {item.use}</p>
                  <p className="text-sm text-muted-foreground">{item.benefit}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6 italic">
              * Guía detalla dosis, horarios y cómo maximizar cada suplemento
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
                  title: "Filosofía Shaklee",
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
