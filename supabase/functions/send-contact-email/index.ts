import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.74.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

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

// Input validation and sanitization
function validateAndSanitize(data: ContactEmailRequest): { valid: boolean; error?: string; sanitized?: ContactEmailRequest } {
  const { name, email, phone, message } = data;

  // Validate required fields
  if (!name || !email || !phone || !message) {
    return { valid: false, error: "Todos los campos son requeridos" };
  }

  // Validate lengths
  if (name.length > 100) {
    return { valid: false, error: "El nombre es demasiado largo" };
  }
  if (email.length > 255) {
    return { valid: false, error: "El email es demasiado largo" };
  }
  if (phone.length > 20) {
    return { valid: false, error: "El teléfono es demasiado largo" };
  }
  if (message.length > 2000) {
    return { valid: false, error: "El mensaje es demasiado largo" };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Email inválido" };
  }

  // Validate phone format (basic)
  const phoneRegex = /^[\d\s\+\-\(\)]+$/;
  if (!phoneRegex.test(phone)) {
    return { valid: false, error: "Teléfono inválido" };
  }

  // Sanitize inputs (remove potentially harmful characters)
  const sanitized: ContactEmailRequest = {
    name: name.trim().replace(/[<>]/g, ""),
    email: email.trim().toLowerCase(),
    phone: phone.trim().replace(/[<>]/g, ""),
    message: message.trim().replace(/[<>]/g, ""),
  };

  return { valid: true, sanitized };
}

// Rate limiting check
async function checkRateLimit(email: string): Promise<{ allowed: boolean; error?: string }> {
  try {
    // Check submissions in the last hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    
    const { data, error } = await supabase
      .from("leads")
      .select("id")
      .eq("email", email)
      .gte("created_at", oneHourAgo);

    if (error) {
      console.error("Rate limit check error:", error);
      return { allowed: true }; // Allow on error to avoid blocking legitimate users
    }

    // Allow max 3 submissions per hour
    if (data && data.length >= 3) {
      return { 
        allowed: false, 
        error: "Has alcanzado el límite de envíos. Por favor intenta más tarde." 
      };
    }

    return { allowed: true };
  } catch (error) {
    console.error("Rate limit check exception:", error);
    return { allowed: true }; // Allow on error
  }
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: ContactEmailRequest = await req.json();

    // Validate and sanitize input
    const validation = validateAndSanitize(requestData);
    if (!validation.valid) {
      console.warn("Validation failed:", validation.error);
      return new Response(
        JSON.stringify({ error: "Datos inválidos. Por favor verifica tu información." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, phone, message } = validation.sanitized!;

    // Check rate limiting
    const rateLimitCheck = await checkRateLimit(email);
    if (!rateLimitCheck.allowed) {
      console.warn("Rate limit exceeded for:", email);
      return new Response(
        JSON.stringify({ error: rateLimitCheck.error }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Processing contact form submission");

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
    console.error("Error processing contact form:", error);
    // Don't expose internal error details
    return new Response(
      JSON.stringify({ error: "Error al procesar tu solicitud. Por favor intenta de nuevo o contáctame por WhatsApp." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
