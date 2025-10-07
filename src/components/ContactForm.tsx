import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Send, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [leadId, setLeadId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  // Auto-save form data to capture partial leads
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Only save if there's some data
    if (formData.nombre || formData.email || formData.telefono || formData.mensaje) {
      saveTimeoutRef.current = setTimeout(async () => {
        try {
          const source = document.referrer || "direct";
          
          if (leadId) {
            // Update existing lead
            await supabase
              .from("leads")
              .update({
                name: formData.nombre,
                email: formData.email,
                phone: formData.telefono,
                message: formData.mensaje,
              })
              .eq("id", leadId);
          } else {
            // Create new lead
            const { data, error } = await supabase
              .from("leads")
              .insert({
                name: formData.nombre,
                email: formData.email,
                phone: formData.telefono,
                message: formData.mensaje,
                source: source,
                submitted: false,
              })
              .select()
              .single();

            if (data && !error) {
              setLeadId(data.id);
            }
          }
        } catch (error) {
          console.error("Error saving lead:", error);
        }
      }, 1000); // Save after 1 second of inactivity
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [formData, leadId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Mark lead as submitted
      if (leadId) {
        await supabase
          .from("leads")
          .update({ submitted: true })
          .eq("id", leadId);
      }

      // Send email via edge function
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: formData.nombre,
          email: formData.email,
          phone: formData.telefono,
          message: formData.mensaje,
        },
      });

      if (error) throw error;

      toast({
        title: "¡Mensaje enviado!",
        description: "Revisa tu correo, te he enviado una confirmación. Te contactaré pronto.",
      });
      
      setFormData({ nombre: "", email: "", telefono: "", mensaje: "" });
      setLeadId(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                  disabled={isSubmitting}
                  className="w-full h-12 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
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
