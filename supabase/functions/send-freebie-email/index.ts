import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FreebieEmailRequest {
  email: string;
  name?: string;
}

// Validate and sanitize input
function validateInput(data: FreebieEmailRequest): { valid: boolean; error?: string; sanitized?: FreebieEmailRequest } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!data.email || typeof data.email !== 'string') {
    return { valid: false, error: "Email es requerido" };
  }
  
  const email = data.email.trim().toLowerCase();
  
  if (email.length > 255) {
    return { valid: false, error: "Email demasiado largo" };
  }
  
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Formato de email inválido" };
  }
  
  const name = data.name ? data.name.trim().substring(0, 100).replace(/[<>]/g, "") : undefined;
  
  return { valid: true, sanitized: { email, name } };
}

// Check rate limit - max 3 freebie requests per email per hour
async function checkRateLimit(email: string): Promise<{ allowed: boolean; error?: string }> {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    
    const { count, error } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("email", email)
      .eq("source", "freebie")
      .gte("created_at", oneHourAgo);
    
    if (error) {
      console.error("Rate limit check error:", error);
      return { allowed: true }; // Allow on error to not block legitimate users
    }
    
    if (count && count >= 3) {
      return { allowed: false, error: "Demasiadas solicitudes. Por favor intenta más tarde." };
    }
    
    return { allowed: true };
  } catch (error) {
    console.error("Rate limit check exception:", error);
    return { allowed: true };
  }
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData: FreebieEmailRequest = await req.json();
    
    // Validate input
    const validation = validateInput(rawData);
    if (!validation.valid) {
      console.log("Validation failed:", validation.error);
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    const { email, name } = validation.sanitized!;
    
    // Check rate limit
    const rateLimit = await checkRateLimit(email);
    if (!rateLimit.allowed) {
      console.log("Rate limit exceeded for:", email);
      return new Response(
        JSON.stringify({ error: rateLimit.error }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    console.log("Sending freebie email to:", email);

    // Download PDF from Supabase Storage
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data: pdfData, error: storageError } = await supabase.storage
      .from("digital-products")
      .download("Recetario");

    let pdfAttachment = null;
    
    if (storageError || !pdfData) {
      console.error("Error downloading PDF from storage:", storageError);
      // Continue without attachment but log the error
    } else {
      try {
        // Convert to base64 using chunks to avoid stack overflow
        const arrayBuffer = await pdfData.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        
        // Process in chunks to avoid "Maximum call stack size exceeded"
        const chunkSize = 8192;
        let binaryString = "";
        for (let i = 0; i < uint8Array.length; i += chunkSize) {
          const chunk = uint8Array.subarray(i, i + chunkSize);
          binaryString += String.fromCharCode.apply(null, Array.from(chunk));
        }
        const base64Pdf = btoa(binaryString);
        
        pdfAttachment = {
          filename: "Recetario-Giro180.pdf",
          content: base64Pdf,
        };
        console.log("PDF attachment prepared successfully");
      } catch (pdfError) {
        console.error("Error processing PDF:", pdfError);
      }
    }

    const emailResponse = await resend.emails.send({
      from: "Ariana Wellness <onboarding@resend.dev>",
      to: [email],
      subject: "🎁 Tus 7 Recetas Gratis - Transformación Giro180",
      ...(pdfAttachment && { attachments: [pdfAttachment] }),
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #ec4899 0%, #f97316 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; background: linear-gradient(135deg, #ec4899 0%, #f97316 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
              .recipe-list { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .recipe-item { padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
              .recipe-item:last-child { border-bottom: none; }
              .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 ¡Bienvenida ${name || 'a tu transformación'}!</h1>
                <p>Tus 7 Recetas Gratis están listas</p>
              </div>
              
              <div class="content">
                <p>Hola ${name || ''},</p>
                
                <p>¡Gracias por unirte a la comunidad Giro180! 🌟</p>
                
                <p>Aquí tienes tus <strong>7 recetas balanceadas</strong> siguiendo la filosofía de bienestar que transformó la vida de más de 500 mujeres:</p>
                
                <div class="recipe-list">
                  <div class="recipe-item">🥤 <strong>Smoothie Bowl Energético</strong> - Desayuno 1 (5 min, 320 cal)</div>
                  <div class="recipe-item">🍳 <strong>Omelette de Claras Fitness</strong> - Desayuno 2 (10 min, 250 cal)</div>
                  <div class="recipe-item">🥗 <strong>Ensalada de Pollo a la Parrilla</strong> - Almuerzo 1 (15 min, 380 cal)</div>
                  <div class="recipe-item">🍲 <strong>Bowl Mediterráneo de Quinoa</strong> - Almuerzo 2 (20 min, 410 cal)</div>
                  <div class="recipe-item">🐟 <strong>Salmón al Horno con Vegetales</strong> - Cena 1 (25 min, 420 cal)</div>
                  <div class="recipe-item">🍗 <strong>Salteado de Pavo con Vegetales</strong> - Cena 2 (15 min, 360 cal)</div>
                  <div class="recipe-item">🥄 <strong>Parfait Proteico</strong> - Snack (3 min, 220 cal)</div>
                </div>
                
                <center>
                  <p style="display: inline-block; background: #10b981; color: white; padding: 15px 40px; border-radius: 8px; font-weight: bold; margin: 20px 0;">📎 Tu recetario viene adjunto a este email</p>
                </center>
                
                <p><strong>Cada receta incluye:</strong></p>
                <ul>
                  <li>✅ Ingredientes con porciones exactas</li>
                  <li>✅ Pasos de preparación detallados</li>
                  <li>✅ Valores nutricionales completos</li>
                  <li>✅ Tips de sustitución</li>
                  <li>✅ Fotos inspiradoras</li>
                </ul>
                
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
                
                <h3>🔥 ¿Lista para tu transformación completa?</h3>
                <p>Estas 7 recetas son solo el inicio. Si quieres resultados reales (5-10 lbs en 30 días), necesitas:</p>
                
                <ul>
                  <li>📅 Plan completo de 30 días con menús semanales</li>
                  <li>💪 Rutinas de ejercicio diarias (20-30 min)</li>
                  <li>💊 Guía de suplementación para acelerar resultados</li>
                  <li>📊 Sistema de seguimiento y plantillas</li>
                </ul>
                
                <center>
                  <a href="${Deno.env.get('VITE_SUPABASE_URL')?.replace('supabase.co', 'lovable.app') || 'https://arianawellness.lovable.app'}/guia-completa" class="button">Ver Guía Completa - Solo $27</a>
                </center>
                
                <p style="text-align: center; color: #6b7280; font-size: 14px;">Oferta especial de lanzamiento • Valor real $179+</p>
              </div>
              
              <div class="footer">
                <p>Con amor, Ariana 💕<br>
                Tu Coach de Bienestar</p>
                <p style="font-size: 12px; margin-top: 20px;">
                  ¿No solicitaste estas recetas? Puedes ignorar este email.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending freebie email:", error);
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
