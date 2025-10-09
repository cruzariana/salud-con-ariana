import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    meta: "",
    tiempo: "",
    ejercicio: "",
    trabajo: "",
    tiempoDisponible: "",
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
    if (formData.nombre || formData.email || formData.telefono || formData.mensaje || formData.meta) {
      saveTimeoutRef.current = setTimeout(async () => {
        try {
          const source = document.referrer || "direct";
          const detailedMessage = `Meta: ${formData.meta}\nTiempo deseado: ${formData.tiempo}\nHace ejercicio: ${formData.ejercicio}\nTrabaja: ${formData.trabajo}\nTiempo disponible: ${formData.tiempoDisponible}\n\nMensaje adicional: ${formData.mensaje}`;
          
          if (leadId) {
            // Update existing lead
            await supabase
              .from("leads")
              .update({
                name: formData.nombre,
                email: formData.email,
                phone: formData.telefono,
                message: detailedMessage,
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
                message: detailedMessage,
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
      const detailedMessage = `Meta: ${formData.meta}\nTiempo deseado: ${formData.tiempo}\nHace ejercicio: ${formData.ejercicio}\nTrabaja: ${formData.trabajo}\nTiempo disponible: ${formData.tiempoDisponible}\n\nMensaje adicional: ${formData.mensaje}`;
      
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: formData.nombre,
          email: formData.email,
          phone: formData.telefono,
          message: detailedMessage,
        },
      });

      if (error) throw error;

      toast({
        title: "¡Mensaje enviado!",
        description: "Revisa tu correo, te he enviado una confirmación. Te contactaré pronto.",
      });
      
      setFormData({ 
        nombre: "", 
        email: "", 
        telefono: "", 
        meta: "",
        tiempo: "",
        ejercicio: "",
        trabajo: "",
        tiempoDisponible: "",
        mensaje: "" 
      });
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
                  <Label htmlFor="meta" className="text-base font-semibold mb-2 block">
                    ¿Cuál es tu meta principal? *
                  </Label>
                  <Select
                    value={formData.meta}
                    onValueChange={(value) => setFormData({ ...formData, meta: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Selecciona tu meta" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="perdida-peso">Pérdida de Peso</SelectItem>
                      <SelectItem value="tonificacion">Tonificación</SelectItem>
                      <SelectItem value="energia">Más Energía y Vitalidad</SelectItem>
                      <SelectItem value="alimentacion">Alimentación Consciente</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tiempo" className="text-base font-semibold mb-2 block">
                    ¿En cuánto tiempo deseas completar tu meta?
                  </Label>
                  <Select
                    value={formData.tiempo}
                    onValueChange={(value) => setFormData({ ...formData, tiempo: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Selecciona un tiempo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3-meses">1-3 meses</SelectItem>
                      <SelectItem value="3-6-meses">3-6 meses</SelectItem>
                      <SelectItem value="6-12-meses">6-12 meses</SelectItem>
                      <SelectItem value="mas-12-meses">Más de 12 meses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="ejercicio" className="text-base font-semibold mb-2 block">
                    ¿Actualmente haces ejercicio?
                  </Label>
                  <Select
                    value={formData.ejercicio}
                    onValueChange={(value) => setFormData({ ...formData, ejercicio: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="si-regularmente">Sí, regularmente (3+ veces/semana)</SelectItem>
                      <SelectItem value="ocasionalmente">Ocasionalmente (1-2 veces/semana)</SelectItem>
                      <SelectItem value="no">No, no hago ejercicio actualmente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="trabajo" className="text-base font-semibold mb-2 block">
                    ¿Trabajas actualmente?
                  </Label>
                  <Select
                    value={formData.trabajo}
                    onValueChange={(value) => setFormData({ ...formData, trabajo: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tiempo-completo">Sí, tiempo completo</SelectItem>
                      <SelectItem value="medio-tiempo">Sí, medio tiempo</SelectItem>
                      <SelectItem value="hogar">Trabajo desde casa / Ama de casa</SelectItem>
                      <SelectItem value="no-trabajo">No trabajo actualmente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tiempoDisponible" className="text-base font-semibold mb-2 block">
                    ¿Cuánto tiempo tienes disponible para ejercicio?
                  </Label>
                  <Select
                    value={formData.tiempoDisponible}
                    onValueChange={(value) => setFormData({ ...formData, tiempoDisponible: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="menos-30min">Menos de 30 minutos al día</SelectItem>
                      <SelectItem value="30-60min">30-60 minutos al día</SelectItem>
                      <SelectItem value="1-2horas">1-2 horas al día</SelectItem>
                      <SelectItem value="mas-2horas">Más de 2 horas al día</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="mensaje" className="text-base font-semibold mb-2 block">
                    ¿Algo más que quieras compartir? (Opcional)
                  </Label>
                  <Textarea
                    id="mensaje"
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    placeholder="Cuéntame más sobre tus retos, motivaciones o preguntas..."
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-12 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                >
                  {isSubmitting ? "Enviando..." : "Quiero Mi Plan Personalizado"}
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
