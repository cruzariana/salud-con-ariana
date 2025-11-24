import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Download, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import smoothieBowl from "@/assets/recipe-smoothie-bowl.jpg";
import omelet from "@/assets/recipe-omelet.jpg";
import chickenSalad from "@/assets/recipe-chicken-salad.jpg";
import quinoaBowl from "@/assets/recipe-quinoa-bowl.jpg";
import salmonDinner from "@/assets/recipe-salmon-dinner.jpg";
import turkeyStirfry from "@/assets/recipe-turkey-stirfry.jpg";
import yogurtParfait from "@/assets/recipe-yogurt-parfait.jpg";

const recipes = [
  {
    title: "Smoothie Bowl Energético",
    category: "Desayuno 1",
    image: smoothieBowl,
    time: "5 min",
    calories: 320,
    protein: "24g",
    ingredients: [
      "1 scoop Shaklee Life Shake (sabor berry)",
      "1/2 taza fresas congeladas",
      "1/2 plátano",
      "1/2 taza leche de almendras sin azúcar",
      "1 cucharada semillas de chía",
      "Toppings: granola (2 tbsp), arándanos, rodajas de plátano"
    ],
    steps: [
      "Licúa Life Shake, fresas, plátano y leche hasta obtener consistencia espesa",
      "Vierte en un bowl",
      "Decora con granola, arándanos y rodajas de plátano",
      "Espolvorea semillas de chía por encima"
    ],
    tips: "Sustituye con proteína en polvo de tu preferencia. Para duplicar, usa 2 scoops de proteína y el doble de ingredientes.",
    substitutions: "Leche de coco o descremada • Mango en lugar de fresas • Nueces en vez de granola"
  },
  {
    title: "Omelette de Claras Fitness",
    category: "Desayuno 2",
    image: omelet,
    time: "10 min",
    calories: 250,
    protein: "28g",
    ingredients: [
      "4 claras de huevo (o 1 taza de claras líquidas)",
      "1/2 taza espinacas frescas",
      "1/4 taza champiñones en rodajas",
      "1/4 taza tomates cherry cortados",
      "1 cucharada queso bajo en grasa (opcional)",
      "Spray de cocina",
      "Sal, pimienta y ajo en polvo al gusto"
    ],
    steps: [
      "Rocía sartén con spray de cocina y calienta a fuego medio",
      "Saltea espinacas, champiñones y tomates por 2-3 minutos",
      "Retira vegetales y reserva",
      "Bate las claras con sal, pimienta y ajo en polvo",
      "Vierte en la sartén y cocina hasta que empiece a cuajar",
      "Agrega vegetales y queso en un lado",
      "Dobla el omelette por la mitad y sirve"
    ],
    tips: "Prepara vegetales la noche anterior. Para 2 porciones, duplica todos los ingredientes.",
    substitutions: "Pimientos en lugar de champiñones • Queso cottage en vez de queso regular • Huevos enteros (2 enteros) si prefieres"
  },
  {
    title: "Ensalada de Pollo a la Parrilla",
    category: "Almuerzo 1",
    image: chickenSalad,
    time: "15 min",
    calories: 380,
    protein: "42g",
    ingredients: [
      "120g pechuga de pollo (4 oz)",
      "2 tazas mezcla de lechugas",
      "1/2 taza tomates cherry",
      "1/4 aguacate en rodajas",
      "1/4 taza pepino",
      "2 cucharadas vinagreta balsámica light",
      "Jugo de limón, sal y pimienta"
    ],
    steps: [
      "Sazona el pollo con sal, pimienta y limón",
      "Cocina a la parrilla o sartén 6-7 min por lado hasta cocinar completamente",
      "Deja reposar 5 min y corta en tiras",
      "Mezcla lechugas, tomates y pepino en un bowl",
      "Coloca pollo encima",
      "Añade aguacate y vinagreta",
      "Exprime limón fresco al servir"
    ],
    tips: "Meal prep: cocina 3-4 pechugas el domingo. Para duplicar, usa 240g de pollo y el doble de vegetales.",
    substitutions: "Salmón o atún en lugar de pollo • Espinaca baby en vez de lechuga • Aceite de oliva y vinagre balsámico casero"
  },
  {
    title: "Bowl Mediterráneo de Quinoa",
    category: "Almuerzo 2",
    image: quinoaBowl,
    time: "20 min",
    calories: 410,
    protein: "18g",
    ingredients: [
      "1/2 taza quinoa cocida",
      "1/2 taza garbanzos asados",
      "1/2 taza vegetales asados (calabacín, pimientos, berenjena)",
      "2 cucharadas hummus",
      "Espinacas frescas",
      "1 cucharada tahini",
      "Especias: comino, páprika, ajo en polvo"
    ],
    steps: [
      "Cocina quinoa según instrucciones del paquete (o usa pre-cocida)",
      "Asa vegetales cortados con spray de cocina y especias a 400°F por 15 min",
      "Escurre y enjuaga garbanzos, mézclalos con especias y asa por 20 min",
      "En un bowl, coloca quinoa como base",
      "Añade vegetales asados y garbanzos",
      "Agrega espinacas frescas",
      "Corona con hummus y un chorrito de tahini"
    ],
    tips: "Prepara quinoa y garbanzos asados en batch los domingos. Para 2 porciones, duplica ingredientes.",
    substitutions: "Arroz integral en vez de quinoa • Frijoles negros en lugar de garbanzos • Yogurt griego en vez de hummus"
  },
  {
    title: "Salmón al Horno con Vegetales",
    category: "Cena 1",
    image: salmonDinner,
    time: "25 min",
    calories: 420,
    protein: "38g",
    ingredients: [
      "120g filete de salmón (4 oz)",
      "1 taza brócoli",
      "1/2 batata mediana en cubos",
      "1 cucharada aceite de oliva",
      "Limón, ajo, sal, pimienta",
      "Eneldo o perejil fresco"
    ],
    steps: [
      "Precalienta horno a 400°F (200°C)",
      "Coloca brócoli y batata en bandeja, rocía con 1/2 cucharada aceite de oliva",
      "Hornea vegetales por 15 minutos",
      "Sazona salmón con sal, pimienta, ajo y limón",
      "Agrega salmón a la bandeja con vegetales",
      "Hornea todo junto por 12-15 min más",
      "Decora con eneldo o perejil fresco y rodajas de limón"
    ],
    tips: "El salmón está listo cuando se separa fácilmente con tenedor. Para 2 porciones, duplica todo.",
    substitutions: "Tilapia o bacalao en vez de salmón • Coliflor en lugar de brócoli • Camote o calabaza en vez de batata"
  },
  {
    title: "Salteado de Pavo con Vegetales",
    category: "Cena 2",
    image: turkeyStirfry,
    time: "15 min",
    calories: 360,
    protein: "35g",
    ingredients: [
      "120g pavo molido magro (93% lean)",
      "1 taza vegetales mixtos (pimientos, zucchini, cebolla)",
      "1/2 taza arroz integral cocido",
      "2 cucharadas salsa de soya baja en sodio",
      "1 cucharadita aceite de ajonjolí",
      "Ajo, jengibre fresco rallado",
      "Cebollín para decorar"
    ],
    steps: [
      "Calienta aceite de ajonjolí en wok o sartén grande",
      "Saltea ajo y jengibre por 30 segundos",
      "Añade pavo molido, cocina hasta dorar (5-6 min)",
      "Agrega vegetales cortados, saltea 4-5 min hasta tiernos pero crujientes",
      "Incorpora arroz integral y salsa de soya",
      "Mezcla bien por 2 minutos",
      "Sirve decorado con cebollín"
    ],
    tips: "Usa arroz pre-cocido para ahorrar tiempo. Para 2 porciones, duplica ingredientes.",
    substitutions: "Pollo molido en vez de pavo • Quinoa en lugar de arroz • Aminoácidos líquidos en vez de salsa de soya"
  },
  {
    title: "Parfait Proteico",
    category: "Snack",
    image: yogurtParfait,
    time: "3 min",
    calories: 220,
    protein: "20g",
    ingredients: [
      "1 taza yogurt griego sin grasa",
      "1/2 taza frutos rojos mixtos",
      "1 cucharada almendras fileteadas",
      "1 cucharadita miel cruda",
      "Pizca de canela"
    ],
    steps: [
      "En un vaso o bowl, coloca 1/2 taza de yogurt griego",
      "Añade 1/4 taza de frutos rojos",
      "Agrega otra capa de yogurt",
      "Corona con resto de frutos rojos",
      "Espolvorea almendras y canela",
      "Rocía miel por encima"
    ],
    tips: "Prepara en mason jars para llevar. Para 2 porciones, duplica todo.",
    substitutions: "Yogurt de coco para opción vegana • Nueces en vez de almendras • Stevia en lugar de miel"
  }
];

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
        title: "¡Listo! 🎉",
        description: "Revisa tu email para descargar tus 7 recetas gratis.",
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
            Recetas rápidas, deliciosas y altas en proteína siguiendo la filosofía Shaklee
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
                <Download className="mr-2 w-5 h-5" />
                {isSubmitting ? "Enviando..." : "Descargar Recetas Gratis"}
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
                desc: "2 desayunos, 2 almuerzos, 2 cenas y 1 snack"
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

        {/* Recipe Collage Preview */}
        <div className="max-w-6xl mx-auto">
          <Card className="overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Vista Previa de las 7 Recetas Incluidas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { img: smoothieBowl, name: "Smoothie Bowl" },
                { img: omelet, name: "Omelet Proteico" },
                { img: chickenSalad, name: "Ensalada de Pollo" },
                { img: quinoaBowl, name: "Bowl de Quinoa" },
                { img: salmonDinner, name: "Salmón al Horno" },
                { img: turkeyStirfry, name: "Salteado de Pavo" },
                { img: yogurtParfait, name: "Parfait Proteico" }
              ].map((item, i) => (
                <div key={i} className="relative group overflow-hidden rounded-lg shadow-md">
                  <img 
                    src={item.img} 
                    alt={item.name}
                    className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                    <p className="text-white font-semibold text-sm">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground">
              Cada receta incluye: ingredientes, pasos detallados, valores nutricionales, tips de sustitución
            </p>
          </Card>
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
              onClick={() => navigate('/guia-completa')}
              className="mb-4"
            >
              Ver Guía Completa - $27
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
