import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Send, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construir mensaje para WhatsApp
    const whatsappMessage = `¡Hola! Me interesa tu programa de bienestar.%0A%0A*Nombre:* ${formData.nombre}%0A*Email:* ${formData.email}%0A*Teléfono:* ${formData.telefono}%0A*Mensaje:* ${formData.mensaje}`;
    
    // Abrir WhatsApp (reemplaza con tu número real)
    window.open(`https://wa.me/17872101758?text=${whatsappMessage}`, '_blank');
    
    toast({
      title: "¡Mensaje enviado!",
      description: "Te contactaré pronto para ayudarte a comenzar tu transformación.",
    });
    
    setFormData({ nombre: "", email: "", telefono: "", mensaje: "" });
  };

  return (
    <section id="contacto" className="py-20 bg-gradient-to-b from-muted to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              ¡Comienza Tu Transformación Hoy!
            </h2>
            <p className="text-xl text-muted-foreground">
              Completa el formulario y te contactaré para crear tu plan personalizado
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="nombre" className="text-base font-semibold mb-2 block">
                    Nombre Completo *
                  </Label>
                  <Input
                    id="nombre"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Tu nombre"
                    className="h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-base font-semibold mb-2 block">
                    Correo Electrónico *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tu@email.com"
                    className="h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="telefono" className="text-base font-semibold mb-2 block">
                    Teléfono (WhatsApp)
                  </Label>
                  <Input
                    id="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    placeholder="Tu número de WhatsApp"
                    className="h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="mensaje" className="text-base font-semibold mb-2 block">
                    Cuéntame Sobre Tus Metas
                  </Label>
                  <Textarea
                    id="mensaje"
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    placeholder="¿Qué te gustaría lograr? (pérdida de peso, tonificación, más energía, etc.)"
                    rows={5}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                >
                  Enviar Mensaje
                  <Send className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </Card>

            <div className="space-y-6">
              <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
                <MessageCircle className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-4">Contacto Directo por WhatsApp</h3>
                <p className="text-muted-foreground mb-6">
                  ¿Prefieres contactarme directamente? Envíame un mensaje por WhatsApp y te responderé de inmediato.
                </p>
                <Button 
                  onClick={() => window.open('https://wa.me/17872101758', '_blank')}
                  variant="outline"
                  className="w-full h-12 text-lg border-2 hover:bg-secondary/20"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Abrir WhatsApp
                </Button>
              </Card>

              <Card className="p-8">
                <h3 className="text-xl font-bold mb-4">¿Por Qué Elegirnos?</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Productos premium de alta calidad</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Respaldados por ciencia y nutrición</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Apoyo personalizado y continuo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Comunidad de mujeres empoderadas</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
