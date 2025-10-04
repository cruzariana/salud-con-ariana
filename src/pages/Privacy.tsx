import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
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

        <h1 className="text-4xl font-bold mb-8">Política de Privacidad</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Información que Recopilamos</h2>
            <p>
              En Ariana Cruz Bienestar y Salud, recopilamos información personal que nos proporcionas voluntariamente cuando te pones en contacto con nosotros, incluyendo:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nombre completo</li>
              <li>Correo electrónico</li>
              <li>Número de teléfono (WhatsApp)</li>
              <li>Información sobre tus objetivos de salud y bienestar</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Uso de la Información</h2>
            <p>Utilizamos tu información personal para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Responder a tus consultas y solicitudes</li>
              <li>Crear planes personalizados de bienestar</li>
              <li>Comunicarnos contigo sobre nuestros servicios</li>
              <li>Mejorar nuestros servicios y experiencia del cliente</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Protección de Datos</h2>
            <p>
              Nos comprometemos a proteger tu información personal. Implementamos medidas de seguridad apropiadas para prevenir el acceso no autorizado, alteración o divulgación de tus datos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Compartir Información</h2>
            <p>
              No vendemos, comercializamos ni transferimos tu información personal a terceros. Tu información es confidencial y se utiliza exclusivamente para los fines mencionados anteriormente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Tus Derechos</h2>
            <p>Tienes derecho a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Acceder a tu información personal</li>
              <li>Solicitar correcciones a tu información</li>
              <li>Solicitar la eliminación de tu información</li>
              <li>Retirar tu consentimiento en cualquier momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Contacto</h2>
            <p>
              Si tienes preguntas sobre esta Política de Privacidad, puedes contactarnos a través de WhatsApp o mediante el formulario de contacto en nuestro sitio web.
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

export default Privacy;