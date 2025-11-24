import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Download, Mail, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function PurchaseSuccess() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Mostrar confirmación
    toast({
      title: "¡Compra Exitosa! 🎉",
      description: "Revisa tu email para acceder a la Guía Completa.",
    });
  }, [toast]);

  const handleDownload = () => {
    // Aquí irá el enlace real de descarga
    window.open("https://drive.google.com/YOUR_GUIDE_FILE_ID", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            ¡Felicidades! Tu Transformación Comienza Ahora
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            Has desbloqueado el sistema completo que más de 500 mujeres usaron para transformar sus vidas en 30 días
          </p>

          <div className="bg-background/60 backdrop-blur rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
              <Mail className="w-6 h-6 text-primary" />
              Revisa tu Email
            </h2>
            <p className="text-muted-foreground mb-4">
              Te enviamos un email con:
            </p>
            <ul className="text-left space-y-2 max-w-md mx-auto">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Enlace de descarga de la Guía Completa (PDF)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Plan de alimentación 30 días con listas de compras</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Calendario de ejercicios y rutinas completas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Guía de suplementación y plantillas de seguimiento</span>
              </li>
            </ul>
          </div>

          <Button
            size="lg"
            onClick={handleDownload}
            className="w-full md:w-auto mb-4 bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            <Download className="mr-2 w-5 h-5" />
            Descargar Guía Ahora
          </Button>

          <p className="text-sm text-muted-foreground mb-8">
            ¿No ves el email? Revisa tu carpeta de spam o promociones
          </p>

          <div className="border-t pt-8">
            <h3 className="text-xl font-bold mb-4">Próximos Pasos</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-background/40 p-4 rounded-lg">
                <div className="text-2xl mb-2">1️⃣</div>
                <p className="font-semibold mb-1">Descarga tu guía</p>
                <p className="text-muted-foreground">Imprime o guarda en tu dispositivo</p>
              </div>
              <div className="bg-background/40 p-4 rounded-lg">
                <div className="text-2xl mb-2">2️⃣</div>
                <p className="font-semibold mb-1">Haz tu lista de compras</p>
                <p className="text-muted-foreground">Prepara ingredientes de la semana 1</p>
              </div>
              <div className="bg-background/40 p-4 rounded-lg">
                <div className="text-2xl mb-2">3️⃣</div>
                <p className="font-semibold mb-1">Comienza mañana</p>
                <p className="text-muted-foreground">Toma foto de tu día 1 para el antes/después</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t">
            <p className="text-muted-foreground mb-4">
              ¿Quieres resultados aún más rápidos y soporte personalizado?
            </p>
            <Button
              variant="outline"
              onClick={() => navigate('/consulta-gratis')}
              className="w-full md:w-auto"
            >
              Agenda Consulta Gratuita
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mt-8"
          >
            ← Volver al inicio
          </Button>
        </Card>
      </div>
    </div>
  );
}
