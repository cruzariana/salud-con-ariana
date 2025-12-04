import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, Video, CheckCircle2, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WHATSAPP_NUMBER = "7872101758";
const WHATSAPP_MESSAGE = "Hola Ariana! Me gustaría agendar una consulta gratuita contigo.";

export default function FreeConsultation() {
  const navigate = useNavigate();

  const availableSlots = [
    { date: "Lunes 15", time: "10:00 AM", available: 2 },
    { date: "Lunes 15", time: "2:00 PM", available: 1 },
    { date: "Martes 16", time: "9:00 AM", available: 3 },
    { date: "Martes 16", time: "4:00 PM", available: 0 },
    { date: "Miércoles 17", time: "11:00 AM", available: 2 },
    { date: "Miércoles 17", time: "3:00 PM", available: 1 },
  ];

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
            <span className="inline-block bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
              ⏰ Cupos Limitados Esta Semana
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Consulta Gratuita de 15 Minutos
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Descubre cuál es el mejor plan para alcanzar tus metas de bienestar
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">En esta consulta:</h2>
              <ul className="space-y-4">
                {[
                  "Evaluaremos tu situación actual y metas",
                  "Identificaremos los obstáculos principales",
                  "Crearemos un plan de acción personalizado",
                  "Responderé todas tus preguntas",
                  "Te mostraré cómo puedo ayudarte"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Card className="mt-8 p-4 bg-primary/5 border-2 border-primary">
                <div className="flex items-center gap-3">
                  <Video className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-bold">Videollamada por Zoom</p>
                    <p className="text-sm text-muted-foreground">
                      100% privada y confidencial
                    </p>
                  </div>
                </div>
              </Card>
            </Card>

            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                Horarios Disponibles
              </h3>
              
              <div className="space-y-3">
                {availableSlots.map((slot, i) => (
                  <Card 
                    key={i}
                    className={`p-4 ${slot.available === 0 ? 'opacity-50' : 'hover:border-primary cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-semibold">{slot.date}</p>
                          <p className="text-sm text-muted-foreground">{slot.time}</p>
                        </div>
                      </div>
                      {slot.available > 0 ? (
                        <Button 
                          size="sm"
                          onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola Ariana! Me gustaría agendar una consulta gratuita contigo para el ${slot.date} a las ${slot.time}.`)}`, '_blank')}
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Reservar
                        </Button>
                      ) : (
                        <span className="text-sm text-muted-foreground font-semibold">
                          Agotado
                        </span>
                      )}
                    </div>
                    {slot.available > 0 && (
                      <p className="text-xs text-accent mt-2">
                        🔥 Solo quedan {slot.available} cupo{slot.available > 1 ? 's' : ''}
                      </p>
                    )}
                  </Card>
                ))}
              </div>

              <Card className="p-6 bg-gradient-to-br from-secondary/10 to-accent/10">
                <p className="text-center font-semibold mb-2">
                  ⚡ Esta consulta es 100% GRATIS
                </p>
                <p className="text-sm text-center text-muted-foreground">
                  Sin compromiso. Solo para personas realmente interesadas en transformar su vida.
                </p>
              </Card>
            </div>
          </div>

          <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 text-center">
            <h3 className="text-xl font-bold mb-4">
              ⏳ Los cupos se están llenando rápido
            </h3>
            <p className="text-muted-foreground mb-6">
              Solo puedo atender un número limitado de consultas cada semana para dar el mejor servicio
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-accent"
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`, '_blank')}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contactar por WhatsApp
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
