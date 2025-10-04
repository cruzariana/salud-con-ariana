import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Terms = () => {
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

        <h1 className="text-4xl font-bold mb-8">Términos y Condiciones</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Aceptación de Términos</h2>
            <p>
              Al acceder y utilizar este sitio web, aceptas estar sujeto a estos Términos y Condiciones. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Servicios Ofrecidos</h2>
            <p>
              Ariana Cruz Bienestar y Salud ofrece servicios de asesoramiento en nutrición, planes de ejercicio personalizados y recomendaciones de suplementos. Estos servicios son de naturaleza informativa y educativa.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Responsabilidad del Usuario</h2>
            <p>Como usuario de nuestros servicios, te comprometes a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Proporcionar información veraz y precisa</li>
              <li>Mantener la confidencialidad de tu información de cuenta</li>
              <li>Consultar con tu médico antes de comenzar cualquier programa de salud o nutrición</li>
              <li>Usar los servicios de manera responsable y legal</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Modificaciones del Servicio</h2>
            <p>
              Nos reservamos el derecho de modificar o discontinuar nuestros servicios en cualquier momento sin previo aviso. No seremos responsables ante ti o ante terceros por cualquier modificación o suspensión del servicio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Propiedad Intelectual</h2>
            <p>
              Todo el contenido de este sitio web, incluyendo textos, gráficos, logos, imágenes y software, es propiedad de Ariana Cruz Bienestar y Salud y está protegido por las leyes de propiedad intelectual.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Limitación de Responsabilidad</h2>
            <p>
              Nuestros servicios se proporcionan "tal cual" sin garantías de ningún tipo. No nos hacemos responsables de cualquier daño directo, indirecto, incidental o consecuente que resulte del uso de nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Modificaciones a los Términos</h2>
            <p>
              Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Contacto</h2>
            <p>
              Para cualquier pregunta sobre estos Términos y Condiciones, puedes contactarnos a través de los medios proporcionados en nuestro sitio web.
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

export default Terms;