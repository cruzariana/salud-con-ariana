import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Disclaimer = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button 
          onClick={() => navigate('/')} 
          variant="ghost" 
          className="mb-8"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Volver al Inicio
        </Button>

        <h1 className="text-4xl font-bold mb-8">Descargo de Responsabilidad</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Información General</h2>
            <p>
              La información proporcionada en este sitio web y a través de nuestros servicios es solo para fines educativos e informativos. No debe ser considerada como consejo médico, diagnóstico o tratamiento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Consulta Médica</h2>
            <p>
              <strong>IMPORTANTE:</strong> Siempre debes consultar con tu médico o un profesional de la salud calificado antes de comenzar cualquier programa de nutrición, ejercicio o suplementación. Cada persona es única y lo que funciona para algunos puede no ser apropiado para otros.
            </p>
            <p>
              Si tienes o sospechas que tienes un problema de salud, no ignores el consejo médico profesional ni retrases buscarlo debido a algo que hayas leído en este sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">No Garantía de Resultados</h2>
            <p>
              Los resultados individuales pueden variar. Los testimonios y ejemplos utilizados son resultados excepcionales y no garantizan que obtendrás los mismos resultados. Tu éxito depende de muchos factores incluyendo:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Tu dedicación y compromiso con el programa</li>
              <li>Tu condición física y de salud actual</li>
              <li>Tu adherencia a las recomendaciones</li>
              <li>Factores genéticos y metabólicos individuales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Productos y Suplementos</h2>
            <p>
              Las recomendaciones sobre productos y suplementos son solo sugerencias basadas en experiencia personal y no deben reemplazar el consejo de tu médico. Consulta siempre con un profesional de la salud antes de tomar cualquier suplemento.
            </p>
            <p>
              No hacemos afirmaciones sobre la curación, prevención o tratamiento de enfermedades con productos o suplementos mencionados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Limitación de Responsabilidad</h2>
            <p>
              Ariana Cruz Bienestar y Salud no se hace responsable de:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Lesiones o problemas de salud que puedan ocurrir al seguir nuestras recomendaciones</li>
              <li>Decisiones tomadas basándose en la información proporcionada</li>
              <li>Resultados no alcanzados o expectativas no cumplidas</li>
              <li>Reacciones adversas a productos o suplementos recomendados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Enlaces Externos</h2>
            <p>
              Este sitio puede contener enlaces a sitios web de terceros. No somos responsables del contenido o las prácticas de privacidad de estos sitios externos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Uso Bajo Tu Propio Riesgo</h2>
            <p>
              Al utilizar este sitio web y nuestros servicios, reconoces y aceptas que lo haces bajo tu propio riesgo. Eres responsable de evaluar la exactitud, integridad y utilidad de cualquier información, opinión o consejo proporcionado.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Emergencias Médicas</h2>
            <p>
              Si experimentas una emergencia médica, llama inmediatamente a los servicios de emergencia locales. No uses este sitio web ni nuestros servicios para emergencias médicas.
            </p>
          </section>

          <p className="text-sm pt-8 border-t">
            <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;