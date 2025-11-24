import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const faqs = [
  {
    question: "¿Necesito equipo de gimnasio?",
    answer: "No, todas las rutinas están diseñadas para hacerse en casa con peso corporal o elementos básicos como mancuernas pequeñas (opcional). Puedes usar botellas de agua como pesas."
  },
  {
    question: "¿Es compatible con dietas vegetarianas o veganas?",
    answer: "Sí, cada receta incluye opciones de sustitución. Puedes reemplazar proteína animal con tofu, tempeh, legumbres o proteína vegetal en polvo."
  },
  {
    question: "¿Cuánto tiempo necesito dedicar por día?",
    answer: "20-30 minutos de ejercicio diario (de lunes a viernes, descanso en fin de semana) y 30-45 minutos para preparar comidas. Con meal prep puedes reducir tiempo a solo 15 minutos diarios."
  },
  {
    question: "¿Cómo recibo el producto después de pagar?",
    answer: "Recibes acceso inmediato. Te enviamos un email con el enlace de descarga del PDF completo (plan + recetas + ejercicios + plantillas). También puedes descargarlo desde la página de confirmación."
  },
  {
    question: "¿Hay devoluciones?",
    answer: "Este es un producto digital descargable, por lo que las ventas son finales. Sin embargo, si tienes algún problema técnico con la descarga, contáctame y lo resolveremos inmediatamente."
  },
  {
    question: "¿Los suplementos están incluidos en el precio?",
    answer: "No, la guía incluye recomendaciones de suplementación y cómo usarlos, pero los productos se compran por separado. Puedes ver los paquetes disponibles en nuestra página principal."
  },
  {
    question: "¿Puedo seguir el plan si tengo condiciones médicas?",
    answer: "Siempre consulta con tu médico antes de iniciar cualquier programa de alimentación o ejercicio, especialmente si tienes condiciones médicas preexistentes o estás embarazada."
  }
];

export default function FAQ() {
  return (
    <Card className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Preguntas Frecuentes
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}
