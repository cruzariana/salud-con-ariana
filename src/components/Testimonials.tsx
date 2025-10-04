import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "María González",
    age: "35 años",
    result: "Perdió 15 kg en 4 meses",
    image: "👩",
    text: "Ariana cambió mi vida completamente. No solo perdí peso, sino que gané energía y confianza. Su apoyo constante fue clave en mi transformación.",
    rating: 5
  },
  {
    name: "Carmen Rodríguez",
    age: "42 años",
    result: "Recuperó su energía",
    image: "👩‍🦰",
    text: "Después de años sintiéndome cansada, los planes de Ariana me devolvieron la vitalidad. Ahora tengo energía para todo el día y me siento increíble.",
    rating: 5
  },
  {
    name: "Isabel Torres",
    age: "28 años",
    result: "Tonificó su cuerpo",
    image: "👱‍♀️",
    text: "Los resultados son evidentes. Logré el cuerpo que siempre quise con un plan realista y sostenible. ¡Gracias Ariana!",
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
                className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2"
              >
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{testimonial.image}</div>
                  <h3 className="font-bold text-xl mb-1">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{testimonial.age}</p>
                  <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
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