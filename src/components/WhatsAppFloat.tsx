import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export const WhatsAppFloat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "17872101758";

  const handleWhatsAppClick = (message: string, action: string) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // 🔹 Registro del evento en Google Analytics
    if (typeof window !== "undefined" && typeof (window as any).gtag !== "undefined") {
      (window as any).gtag("event", "click_whatsapp", {
        event_category: "engagement",
        event_label: action,
        value: 1,
      });
    }

    window.open(whatsappUrl, "_blank");
    setIsOpen(false);
  };

  return (
    <>
      {/* Botón flotante principal */}
      <div className="fixed bottom-6 right-6 z-50">
        {isOpen && (
          <div className="mb-4 bg-card border border-border rounded-lg shadow-lg p-4 w-72 animate-in slide-in-from-bottom-2">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-foreground">¿Cómo te puedo ayudar?</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2">
              <Button
                onClick={() =>
                  handleWhatsAppClick(
                    "¡Hola! Me gustaría información sobre los planes de bienestar.",
                    "Ver planes disponibles"
                  )
                }
                variant="outline"
                className="w-full justify-start text-sm"
              >
                Ver planes disponibles
              </Button>
              <Button
                onClick={() =>
                  handleWhatsAppClick(
                    "Hola, tengo una pregunta sobre el programa.",
                    "Hacer una pregunta"
                  )
                }
                variant="outline"
                className="w-full justify-start text-sm"
              >
                Hacer una pregunta
              </Button>
              <Button
                onClick={() =>
                  handleWhatsAppClick(
                    "¡Hola! Quiero comenzar mi transformación hoy.",
                    "Comenzar ahora"
                  )
                }
                variant="outline"
                className="w-full justify-start text-sm"
              >
                Comenzar ahora
              </Button>
            </div>
          </div>
        )}

        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>
    </>
  );
};
