import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { Resend } from "https://esm.sh/resend@2.0.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2025-08-27.basil",
});

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      console.error("No stripe-signature header found");
      return new Response("No signature", { status: 400 });
    }

    const body = await req.text();
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET not configured");
      return new Response("Webhook secret not configured", { status: 500 });
    }

    // Verify the webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("Webhook signature verification failed:", err);
      return new Response(`Webhook Error: ${errorMessage}`, { status: 400 });
    }

    console.log("Webhook event received:", event.type);

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Processing completed checkout session:", session.id);

      const customerEmail = session.customer_email || session.customer_details?.email;
      
      if (!customerEmail) {
        console.error("No customer email found in session");
        return new Response("No customer email", { status: 400 });
      }

      console.log("Sending Starter Kit to:", customerEmail);

      // Load the PDF file
      const pdfPath = "./public/downloads/Starter_Kit-Giro180.pdf";
      let pdfContent: Uint8Array;
      
      try {
        pdfContent = await Deno.readFile(pdfPath);
      } catch (err) {
        console.error("Error reading PDF file:", err);
        return new Response("PDF file not found", { status: 500 });
      }

      // Convert to base64
      const base64Pdf = btoa(String.fromCharCode(...pdfContent));

      // Send email with PDF attachment
      try {
        const emailResponse = await resend.emails.send({
          from: "Ariana Wellness <onboarding@resend.dev>",
          to: [customerEmail],
          subject: "🎉 Tu Starter Kit Giro180 está listo - ¡Descárgalo aquí!",
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #ec4899 0%, #f97316 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 10px 10px 0 0; }
                  .content { background: #f9fafb; padding: 40px 30px; border-radius: 0 0 10px 10px; }
                  .button { display: inline-block; background: linear-gradient(135deg, #ec4899 0%, #f97316 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
                  .features { background: white; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #ec4899; }
                  .footer { text-align: center; padding: 30px 20px; color: #6b7280; font-size: 14px; }
                  .highlight { background: #fef3c7; padding: 3px 8px; border-radius: 4px; font-weight: 600; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1 style="margin: 0; font-size: 32px;">🎉 ¡Gracias por tu compra!</h1>
                    <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.95;">Tu transformación comienza ahora</p>
                  </div>
                  
                  <div class="content">
                    <p style="font-size: 18px; margin-bottom: 10px;">¡Hola! 👋</p>
                    
                    <p>¡Bienvenida oficialmente a la comunidad Giro180! Estoy muy emocionada de acompañarte en esta hermosa transformación.</p>
                    
                    <p>Tu <strong>Starter Kit de 7 Días</strong> está adjunto en este correo y listo para descargar. 📥</p>
                    
                    <div class="features">
                      <h3 style="margin-top: 0; color: #ec4899;">✨ Incluye todo lo que necesitas:</h3>
                      <ul style="line-height: 1.8; margin: 15px 0;">
                        <li>📅 Plan de Alimentación completo de 7 días</li>
                        <li>🛒 Lista de compras y sustitutos organizados</li>
                        <li>🍽️ Recetas fáciles, deliciosas y nutritivas</li>
                        <li>💪 Rutinas de ejercicio de 20-30 minutos</li>
                        <li>💊 Guía de Suplementación personalizada</li>
                        <li>⏰ Meal Prep Plan para ahorrar tiempo</li>
                        <li>📊 Plantilla de seguimiento de progreso</li>
                        <li>🗺️ Roadmap hacia el Sistema Completo de 30 Días</li>
                      </ul>
                    </div>
                    
                    <p><strong>Próximos pasos:</strong></p>
                    <ol style="line-height: 2;">
                      <li>Descarga el PDF adjunto 📥</li>
                      <li>Lee la bienvenida y la guía de uso 📖</li>
                      <li>Organiza tu lista de compras 🛒</li>
                      <li>¡Empieza tu día 1 mañana! 💪</li>
                    </ol>
                    
                    <p class="highlight" style="text-align: center; margin: 30px 0;">🎯 Resultados esperados: 2-3 lbs y 1-2 pulgadas en 7 días</p>
                    
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
                    
                    <h3 style="color: #ec4899;">💬 ¿Tienes preguntas?</h3>
                    <p>Estoy aquí para apoyarte en cada paso del camino. Si tienes alguna pregunta, no dudes en responder a este email.</p>
                    
                    <p style="margin-top: 30px;"><strong>Con cariño,</strong><br>
                    Ariana Cruz 💕<br>
                    <em style="color: #6b7280;">Tu Coach de Bienestar</em></p>
                  </div>
                  
                  <div class="footer">
                    <p style="margin-bottom: 15px;">🌟 Transformación Giro180 - Cuerpo, Mente y Energía</p>
                    <p style="font-size: 12px; color: #9ca3af;">
                      Si tienes algún problema para descargar el archivo, contáctame y te lo reenviaré.
                    </p>
                  </div>
                </div>
              </body>
            </html>
          `,
          attachments: [
            {
              filename: "Starter_Kit_Giro180.pdf",
              content: base64Pdf,
            },
          ],
        });

        console.log("Email sent successfully:", emailResponse);
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        return new Response("Error sending email", { status: 500 });
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Error in stripe-webhook:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
