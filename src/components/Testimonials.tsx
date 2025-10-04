import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import biancaTransformation from "@/assets/bianca-transformation.jpeg";
import meralysTransformation from "@/assets/meralys-transformation.jpeg";
import yaritzaTransformation from "@/assets/yaritza-transformation.jpeg";

const testimonials = [
  {
    name: "Bianca",
    subtitle: "Mamita de 2",
    result: "33 lbs menos en 6 meses",
    image: biancaTransformation,
    text: "7 meses post-parto (Cesárea + esterilización). 6 meses de progreso. 33 lbs menos, más energía y más confianza ✨🫶🏻",
    rating: 5
  },
  {
    name: "Meralys",
    subtitle: "4 años de transformación",
    result: "60 lbs menos",
    image: meralysTransformation,
    text: "60lbs menos, 4 años de trabajar en mi e ir tras eso que tanto queremos 🩷",
    rating: 5
  },
  {
    name: "Yaritza",
    subtitle: "Febrero vs Septiembre",
    result: "42 lbs menos",
    image: yaritzaTransformation,
    text: "Febrero vs septiembre 🙏🏼 Y me siento otra persona ❤️ 42 libras menos 🙌🏼🙌🏼🙌🏼",
    rating: 5
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-muted to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Historias de Éxito Reales
            </h2>
            <p className="text-xl text-muted-foreground">
              Descubre cómo estas mujeres transformaron sus vidas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 overflow-hidden"
              >
                <div className="mb-6">
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={testimonial.image} 
                      alt={`Transformación de ${testimonial.name}`}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-xl mb-1 text-center">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2 text-center">{testimonial.subtitle}</p>
                  <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold w-full text-center">
                    {testimonial.result}
                  </div>
                </div>

                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-muted-foreground text-center italic leading-relaxed">
                  "{testimonial.text}"
                </p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground">
              ¿Lista para ser la próxima historia de éxito? 
              <a href="#contacto" className="text-primary font-bold hover:underline ml-2">
                Comienza hoy
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};