import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message }: ContactEmailRequest = await req.json();

    console.log("Sending confirmation email to:", email);

    // Send confirmation email to the user
    const confirmationResponse = await resend.emails.send({
      from: "Ariana Cruz <contacto@ariana-cruz.com>",
      replyTo: "cruz.ariana@outlook.com",
      to: [email],
      subject: "¡Gracias por tu interés!",
      html: `
        <h1>¡Hola ${name}!</h1>
        <p>Gracias por contactarme. He recibido tu mensaje y me pondré en contacto contigo muy pronto.</p>
        <p><strong>Resumen de tu mensaje:</strong></p>
        <p>${message}</p>
        <br>
        <p>Saludos,<br><strong>Ariana Cruz</strong><br>Coach de Nutrición y Wellness</p>
      `,
    });

    console.log("Confirmation email sent:", confirmationResponse);

    // Send notification email to Ariana
    const notificationResponse = await resend.emails.send({
      from: "Contacto Web <notificaciones@ariana-cruz.com>",
      replyTo: email, // Reply goes directly to the client
      to: ["cruz.ariana@outlook.com"],
      subject: `Nuevo contacto: ${name}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log("Notification email sent:", notificationResponse);

    return new Response(
      JSON.stringify({ 
        success: true,
        confirmationId: confirmationResponse.data?.id,
        notificationId: notificationResponse.data?.id
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error sending emails:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
