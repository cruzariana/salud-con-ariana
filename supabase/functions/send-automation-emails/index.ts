import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Email templates
const CHECKOUT_URL = "https://ariana-cruz.com/guia-completa";
const UPSELL_URL = "https://us.shaklee.com/es_US/arianacruz/storefront";

const abandonedCartEmails = {
  email1: {
    subject: "¿Te quedaste con tu acceso a mitad? 💛",
    html: (name: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.8; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 30px; }
            .button { display: inline-block; background: linear-gradient(135deg, #ec4899 0%, #f97316 100%); color: white; padding: 15px 35px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .signature { margin-top: 30px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <p>Hola hermosa${name ? ` ${name}` : ''},</p>
            
            <p>Vi que comenzaste tu compra del <strong>Starter Kit Giro180</strong> pero no pudiste completarla.</p>
            
            <p>Aquí puedes retomar tu compra donde la dejaste:</p>
            
            <p style="text-align: center;">
              <a href="${CHECKOUT_URL}" class="button">👉 Completar compra ahora</a>
            </p>
            
            <p>Si tuviste algún problema con el pago, duda o pregunta, solo responde este email. Estoy aquí para ayudarte.</p>
            
            <div class="signature">
              <p>Un abrazo,<br>
              <strong>Ariana</strong> 💛<br>
              <em>Tu Coach de Bienestar</em></p>
            </div>
          </div>
        </body>
      </html>
    `,
  },
  email2: {
    subject: "¿Aún quieres comenzar tu cambio de 7 días? 💪✨",
    html: (name: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.8; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 30px; }
            .button { display: inline-block; background: linear-gradient(135deg, #ec4899 0%, #f97316 100%); color: white; padding: 15px 35px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .signature { margin-top: 30px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <p>Hola hermosa${name ? ` ${name}` : ''},</p>
            
            <p>Ayer comenzaste el proceso para acceder a tu <strong>Starter Kit de 7 días</strong>, pero aún no lo completaste.</p>
            
            <p>Aquí tienes tu enlace directo para finalizar:</p>
            
            <p style="text-align: center;">
              <a href="${CHECKOUT_URL}" class="button">👉 Completar compra</a>
            </p>
            
            <p>Si necesitas ayuda, aquí estoy.</p>
            
            <div class="signature">
              <p>Con cariño,<br>
              <strong>Ariana</strong> ✨</p>
            </div>
          </div>
        </body>
      </html>
    `,
  },
  email3: {
    subject: "Última llamada para acceder a tu Starter Kit de 7 días 💛",
    html: (name: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.8; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 30px; }
            .button { display: inline-block; background: linear-gradient(135deg, #ec4899 0%, #f97316 100%); color: white; padding: 15px 35px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .signature { margin-top: 30px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <p>Hola hermosa${name ? ` ${name}` : ''},</p>
            
            <p>Este es mi último recordatorio porque de verdad quiero que tengas acceso a esto.</p>
            
            <p>Aquí está tu acceso final:</p>
            
            <p style="text-align: center;">
              <a href="${CHECKOUT_URL}" class="button">👉 Finalizar compra y comenzar ahora</a>
            </p>
            
            <div class="signature">
              <p>Estoy aquí cuando estés lista. 💛<br>
              <strong>Ariana</strong></p>
            </div>
          </div>
        </body>
      </html>
    `,
  },
};

const postPurchaseEmails = {
  day3: {
    subject: "¿Cómo te estás sintiendo estos primeros días? ✨",
    html: (name: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.8; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 30px; }
            .benefits { background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .signature { margin-top: 30px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <p>Hola hermosa${name ? ` ${name}` : ''},</p>
            
            <p>¡Ya llevas varios días con tu Starter Kit! 😍</p>
            
            <p>Quiero saber: <strong>¿cómo te estás sintiendo hasta ahora?</strong></p>
            
            <div class="benefits">
              <p>Estos primeros días suelen traer:</p>
              <ul>
                <li>✨ más energía</li>
                <li>🍫 menos antojos</li>
                <li>💨 sensación de liviandad</li>
                <li>🎯 claridad en tus comidas</li>
              </ul>
            </div>
            
            <p>Cuéntame cómo vas, quiero apoyarte.</p>
            
            <div class="signature">
              <p>Un abrazo,<br>
              <strong>Ariana</strong> 💛</p>
            </div>
          </div>
        </body>
      </html>
    `,
  },
  day7: {
    subject: "¡Lo lograste! Y aquí está tu siguiente paso 🔥",
    html: (name: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.8; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 30px; }
            .button { display: inline-block; background: linear-gradient(135deg, #ec4899 0%, #f97316 100%); color: white; padding: 15px 35px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .signature { margin-top: 30px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <p>Hola hermosa${name ? ` ${name}` : ''},</p>
            
            <p>¡Llegaste al día 7! 🎉</p>
            
            <p><strong>Estoy tan orgullosa de ti.</strong></p>
            
            <p>El <strong>Sistema Completo de 30 días</strong> es donde ocurre la verdadera transformación: energía, enfoque, disciplina y resultados reales.</p>
            
            <p style="text-align: center;">
              <a href="${UPSELL_URL}" class="button">👉 Da el próximo paso aquí</a>
            </p>
            
            <div class="signature">
              <p>Cuentas conmigo, siempre. 💛<br>
              <strong>Ariana</strong></p>
            </div>
          </div>
        </body>
      </html>
    `,
  },
  day14: {
    subject: "¿Lista para tu próxima transformación? Esta es tu señal ✨",
    html: (name: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.8; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 30px; }
            .button { display: inline-block; background: linear-gradient(135deg, #ec4899 0%, #f97316 100%); color: white; padding: 15px 35px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .highlight { background: #fef3c7; padding: 15px 20px; border-radius: 8px; margin: 20px 0; font-style: italic; }
            .signature { margin-top: 30px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <p>Hola hermosa${name ? ` ${name}` : ''},</p>
            
            <p>Han pasado unos días desde que terminaste tu Starter Kit, y quería enviarte un mensaje final que sale directo del corazón:</p>
            
            <div class="highlight">
              <p><strong>No vuelvas atrás.</strong><br>
              Tú mereces seguir avanzando.</p>
            </div>
            
            <p style="text-align: center;">
              <a href="${UPSELL_URL}" class="button">👉 Acceder al Sistema Completo Giro180</a>
            </p>
            
            <div class="signature">
              <p>Estoy aquí para ti. 💛<br>
              <strong>Ariana</strong></p>
            </div>
          </div>
        </body>
      </html>
    `,
  },
};

// Welcome Series Emails (BONUS)
const welcomeSeriesEmails = {
  day1: {
    subject: "Tu Día 1 empieza HOY: claridad, enfoque y intención ✨",
    html: (name: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.8; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 30px; }
            .section { background: #f8f4ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ec4899; }
            .section h3 { color: #9333ea; margin-top: 0; }
            .signature { margin-top: 30px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <p>Hola hermosa${name ? ` ${name}` : ''},</p>
            
            <p>¡Hoy comienzas oficialmente tu transformación! Este día es muy importante porque marca el compromiso contigo misma, y quiero ayudarte a que empieces con total claridad.</p>
            
            <p><strong>Aquí tienes tres claves esenciales para que tu semana sea un éxito:</strong></p>
            
            <div class="section">
              <h3>💜 1. Organiza tus comidas del día</h3>
              <p>Antes de comenzar, revisa el plan del día y asegúrate de tener todo lo necesario:</p>
              <ul>
                <li>Proteínas listas o pre-cocinadas</li>
                <li>Vegetales lavados o cortados</li>
                <li>Snacks saludables a la mano</li>
                <li>Agua disponible cerca de ti</li>
              </ul>
              <p><em>La organización elimina la tentación y aumenta las probabilidades de éxito.</em></p>
            </div>
            
            <div class="section">
              <h3>💜 2. Hidratación = energía + menos antojos</h3>
              <p>Hoy proponte tomar:</p>
              <ul>
                <li>8–10 vasos de agua</li>
                <li>Un vaso adicional antes de cada comida</li>
                <li>Opcional: agua con limón o infusión sin azúcar</li>
              </ul>
              <p><em>La hidratación ayuda a controlar la ansiedad, mejora digestión y acelera resultados.</em></p>
            </div>
            
            <div class="section">
              <h3>💜 3. No busques perfección… busca consistencia</h3>
              <p>Esto no se trata de hacerlo "perfecto".<br>
              Se trata de hacerlo con intención, paso a paso.</p>
              <p>Si tienes un tropiezo, respira y continúa.<br>
              Si te sientes abrumada, aquí estoy para ayudarte.</p>
            </div>
            
            <div class="signature">
              <p>Estoy contigo en este proceso.<br>
              Con cariño,<br>
              <strong>Ariana</strong> 💛</p>
            </div>
          </div>
        </body>
      </html>
    `,
  },
  day2: {
    subject: "Hacks que harán tu semana más fácil (y deliciosa) 😍✨",
    html: (name: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.8; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 30px; }
            .hack { background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .hack h3 { color: #d97706; margin-top: 0; }
            .signature { margin-top: 30px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <p>Hola hermosa${name ? ` ${name}` : ''},</p>
            
            <p>Hoy es tu Día 2 y quiero compartirte algunos <strong>hacks</strong> que uso con todas mis chicas del programa para hacer el proceso más fácil, práctico y delicioso.</p>
            
            <div class="hack">
              <h3>💡 Hack 1: Sustitutos inteligentes sin perder resultados</h3>
              <p>Si no tienes algún alimento, puedes usar:</p>
              <ul>
                <li>Pavo → pollo, tofu o atún</li>
                <li>Vegetales mixtos → brócoli, espinaca o espárragos</li>
                <li>Batata → yuca o calabaza</li>
                <li>Huevo → claras líquidas o garbanzos</li>
              </ul>
              <p><em>Lo importante es mantener las porciones y la estructura, no el alimento exacto.</em></p>
            </div>
            
            <div class="hack">
              <h3>💡 Hack 2: Snacks rápidos y aprobados</h3>
              <p>Para momentos de antojo:</p>
              <ul>
                <li>Pepinillos + limón + sal rosada</li>
                <li>Manzana verde + 8 almendras</li>
                <li>Zanahoria con hummus</li>
                <li>Batida de proteína baja en azúcar</li>
              </ul>
            </div>
            
            <div class="hack">
              <h3>💡 Hack 3: Para controlar antojos dulces</h3>
              <p>Haz esto antes de ceder:</p>
              <ul>
                <li>Bebe agua fría</li>
                <li>Respira profundo 3 veces</li>
                <li>Toma un té caliente</li>
                <li>Camina 3 minutos</li>
              </ul>
              <p><em>Funciona porque rompe el impulso de comer por ansiedad.</em></p>
            </div>
            
            <div class="hack">
              <h3>💡 Hack 4: Truco de 5 minutos para subir energía</h3>
              <p>Pon una canción que te encante y muévete 5 minutos:</p>
              <ul>
                <li>baila</li>
                <li>estira</li>
                <li>camina</li>
                <li>sube/baja escaleras</li>
              </ul>
              <p><em>Este pequeño hábito cambia tu energía al instante.</em></p>
            </div>
            
            <div class="signature">
              <p>Tú estás haciendo un trabajo espectacular.<br>
              <strong>Ariana</strong> 💕</p>
            </div>
          </div>
        </body>
      </html>
    `,
  },
  day3: {
    subject: "Cómo medir tu progreso REAL (y sentirte orgullosa) 📊✨",
    html: (name: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.8; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 30px; }
            .tip { background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e; }
            .tip h3 { color: #16a34a; margin-top: 0; }
            .highlight { background: #fef3c7; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; }
            .signature { margin-top: 30px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <p>Hola hermosa${name ? ` ${name}` : ''},</p>
            
            <p>¡Ya vas por el <strong>Día 3</strong> de tu transformación!</p>
            
            <p>Hoy quiero enseñarte la manera más saludable y efectiva de medir tu progreso.</p>
            
            <div class="highlight">
              <p><strong>No todo se trata del número en la balanza.</strong><br>
              Tu progreso real se ve y se siente en otras áreas.</p>
            </div>
            
            <div class="tip">
              <h3>💜 1. Fotos comparativas</h3>
              <p>Tómate fotos en día 1, día 3 y día 7.<br>
              Mismo lugar, misma hora, misma ropa.<br>
              <em>Las fotos muestran cambios que el espejo no refleja.</em></p>
            </div>
            
            <div class="tip">
              <h3>💜 2. Medidas clave</h3>
              <p>Mide:</p>
              <ul>
                <li>cintura</li>
                <li>abdomen ("belly button")</li>
                <li>cadera</li>
                <li>muslo</li>
                <li>brazo</li>
              </ul>
              <p><em>Las medidas muestran progreso incluso cuando el peso fluctúa.</em></p>
            </div>
            
            <div class="tip">
              <h3>💜 3. Energía</h3>
              <p>Pregúntate:</p>
              <ul>
                <li>¿Me siento más ligera?</li>
                <li>¿Tengo más claridad mental?</li>
                <li>¿Tengo menos sueño en la tarde?</li>
              </ul>
            </div>
            
            <div class="tip">
              <h3>💜 4. Inflamación</h3>
              <p>Observa:</p>
              <ul>
                <li>abdomen</li>
                <li>rostro</li>
                <li>manos</li>
                <li>piernas</li>
              </ul>
              <p><em>Cualquier mejora es progreso REAL.</em></p>
            </div>
            
            <div class="tip">
              <h3>💜 5. Estado emocional</h3>
              <p>Cuando el cuerpo se organiza, la mente lo sigue.</p>
              <p>Pregúntate:</p>
              <ul>
                <li>¿Estoy más enfocada?</li>
                <li>¿Más positiva?</li>
                <li>¿Más tranquila?</li>
              </ul>
            </div>
            
            <div class="signature">
              <p>Tú estás creciendo desde adentro.<br>
              Estoy contigo siempre.<br>
              <strong>Ariana</strong> 💛</p>
            </div>
          </div>
        </body>
      </html>
    `,
  },
}

async function sendEmail(to: string, subject: string, html: string) {
  try {
    const result = await resend.emails.send({
      from: "Ariana Wellness <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
    });
    console.log(`Email sent to ${to}:`, result);
    return { success: true, result };
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
    return { success: false, error };
  }
}

async function processAbandonedCartEmails() {
  const now = new Date();
  console.log("Processing abandoned cart emails at:", now.toISOString());

  // Email 1: 15 minutes after checkout started (pending sessions)
  const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);
  const { data: email1Sessions, error: email1Error } = await supabaseAdmin
    .from("checkout_sessions")
    .select("*")
    .eq("status", "pending")
    .eq("abandoned_email_1_sent", false)
    .lt("created_at", fifteenMinutesAgo.toISOString());

  if (email1Error) {
    console.error("Error fetching email 1 sessions:", email1Error);
  } else if (email1Sessions && email1Sessions.length > 0) {
    console.log(`Found ${email1Sessions.length} sessions for abandoned email 1`);
    for (const session of email1Sessions) {
      const result = await sendEmail(
        session.customer_email,
        abandonedCartEmails.email1.subject,
        abandonedCartEmails.email1.html(session.customer_name || "")
      );
      if (result.success) {
        await supabaseAdmin
          .from("checkout_sessions")
          .update({
            abandoned_email_1_sent: true,
            abandoned_email_1_sent_at: new Date().toISOString(),
            status: "abandoned",
          })
          .eq("id", session.id);
      }
    }
  }

  // Email 2: 24 hours after checkout started
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const { data: email2Sessions, error: email2Error } = await supabaseAdmin
    .from("checkout_sessions")
    .select("*")
    .eq("status", "abandoned")
    .eq("abandoned_email_1_sent", true)
    .eq("abandoned_email_2_sent", false)
    .lt("created_at", twentyFourHoursAgo.toISOString());

  if (email2Error) {
    console.error("Error fetching email 2 sessions:", email2Error);
  } else if (email2Sessions && email2Sessions.length > 0) {
    console.log(`Found ${email2Sessions.length} sessions for abandoned email 2`);
    for (const session of email2Sessions) {
      const result = await sendEmail(
        session.customer_email,
        abandonedCartEmails.email2.subject,
        abandonedCartEmails.email2.html(session.customer_name || "")
      );
      if (result.success) {
        await supabaseAdmin
          .from("checkout_sessions")
          .update({
            abandoned_email_2_sent: true,
            abandoned_email_2_sent_at: new Date().toISOString(),
          })
          .eq("id", session.id);
      }
    }
  }

  // Email 3: 48 hours after checkout started
  const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);
  const { data: email3Sessions, error: email3Error } = await supabaseAdmin
    .from("checkout_sessions")
    .select("*")
    .eq("status", "abandoned")
    .eq("abandoned_email_2_sent", true)
    .eq("abandoned_email_3_sent", false)
    .lt("created_at", fortyEightHoursAgo.toISOString());

  if (email3Error) {
    console.error("Error fetching email 3 sessions:", email3Error);
  } else if (email3Sessions && email3Sessions.length > 0) {
    console.log(`Found ${email3Sessions.length} sessions for abandoned email 3`);
    for (const session of email3Sessions) {
      const result = await sendEmail(
        session.customer_email,
        abandonedCartEmails.email3.subject,
        abandonedCartEmails.email3.html(session.customer_name || "")
      );
      if (result.success) {
        await supabaseAdmin
          .from("checkout_sessions")
          .update({
            abandoned_email_3_sent: true,
            abandoned_email_3_sent_at: new Date().toISOString(),
          })
          .eq("id", session.id);
      }
    }
  }
}

async function processPostPurchaseEmails() {
  const now = new Date();
  console.log("Processing post-purchase emails at:", now.toISOString());

  // Day 3 email
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
  const { data: day3Sessions, error: day3Error } = await supabaseAdmin
    .from("checkout_sessions")
    .select("*")
    .eq("status", "completed")
    .eq("post_purchase_day3_sent", false)
    .lt("completed_at", threeDaysAgo.toISOString());

  if (day3Error) {
    console.error("Error fetching day 3 sessions:", day3Error);
  } else if (day3Sessions && day3Sessions.length > 0) {
    console.log(`Found ${day3Sessions.length} sessions for day 3 email`);
    for (const session of day3Sessions) {
      const result = await sendEmail(
        session.customer_email,
        postPurchaseEmails.day3.subject,
        postPurchaseEmails.day3.html(session.customer_name || "")
      );
      if (result.success) {
        await supabaseAdmin
          .from("checkout_sessions")
          .update({
            post_purchase_day3_sent: true,
            post_purchase_day3_sent_at: new Date().toISOString(),
          })
          .eq("id", session.id);
      }
    }
  }

  // Day 7 email
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const { data: day7Sessions, error: day7Error } = await supabaseAdmin
    .from("checkout_sessions")
    .select("*")
    .eq("status", "completed")
    .eq("post_purchase_day7_sent", false)
    .lt("completed_at", sevenDaysAgo.toISOString());

  if (day7Error) {
    console.error("Error fetching day 7 sessions:", day7Error);
  } else if (day7Sessions && day7Sessions.length > 0) {
    console.log(`Found ${day7Sessions.length} sessions for day 7 email`);
    for (const session of day7Sessions) {
      const result = await sendEmail(
        session.customer_email,
        postPurchaseEmails.day7.subject,
        postPurchaseEmails.day7.html(session.customer_name || "")
      );
      if (result.success) {
        await supabaseAdmin
          .from("checkout_sessions")
          .update({
            post_purchase_day7_sent: true,
            post_purchase_day7_sent_at: new Date().toISOString(),
          })
          .eq("id", session.id);
      }
    }
  }

  // Day 14 email
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  const { data: day14Sessions, error: day14Error } = await supabaseAdmin
    .from("checkout_sessions")
    .select("*")
    .eq("status", "completed")
    .eq("post_purchase_day14_sent", false)
    .lt("completed_at", fourteenDaysAgo.toISOString());

  if (day14Error) {
    console.error("Error fetching day 14 sessions:", day14Error);
  } else if (day14Sessions && day14Sessions.length > 0) {
    console.log(`Found ${day14Sessions.length} sessions for day 14 email`);
    for (const session of day14Sessions) {
      const result = await sendEmail(
        session.customer_email,
        postPurchaseEmails.day14.subject,
        postPurchaseEmails.day14.html(session.customer_name || "")
      );
      if (result.success) {
        await supabaseAdmin
          .from("checkout_sessions")
          .update({
            post_purchase_day14_sent: true,
            post_purchase_day14_sent_at: new Date().toISOString(),
          })
          .eq("id", session.id);
      }
    }
  }
}

async function processWelcomeSeriesEmails() {
  const now = new Date();
  console.log("Processing welcome series emails at:", now.toISOString());

  // Welcome Day 1: 1 day after purchase
  const oneDayAgo = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
  const { data: day1Sessions, error: day1Error } = await supabaseAdmin
    .from("checkout_sessions")
    .select("*")
    .eq("status", "completed")
    .eq("welcome_day1_sent", false)
    .lt("completed_at", oneDayAgo.toISOString());

  if (day1Error) {
    console.error("Error fetching welcome day 1 sessions:", day1Error);
  } else if (day1Sessions && day1Sessions.length > 0) {
    console.log(`Found ${day1Sessions.length} sessions for welcome day 1 email`);
    for (const session of day1Sessions) {
      const result = await sendEmail(
        session.customer_email,
        welcomeSeriesEmails.day1.subject,
        welcomeSeriesEmails.day1.html(session.customer_name || "")
      );
      if (result.success) {
        await supabaseAdmin
          .from("checkout_sessions")
          .update({
            welcome_day1_sent: true,
            welcome_day1_sent_at: new Date().toISOString(),
          })
          .eq("id", session.id);
      }
    }
  }

  // Welcome Day 2: 2 days after purchase
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
  const { data: day2Sessions, error: day2Error } = await supabaseAdmin
    .from("checkout_sessions")
    .select("*")
    .eq("status", "completed")
    .eq("welcome_day1_sent", true)
    .eq("welcome_day2_sent", false)
    .lt("completed_at", twoDaysAgo.toISOString());

  if (day2Error) {
    console.error("Error fetching welcome day 2 sessions:", day2Error);
  } else if (day2Sessions && day2Sessions.length > 0) {
    console.log(`Found ${day2Sessions.length} sessions for welcome day 2 email`);
    for (const session of day2Sessions) {
      const result = await sendEmail(
        session.customer_email,
        welcomeSeriesEmails.day2.subject,
        welcomeSeriesEmails.day2.html(session.customer_name || "")
      );
      if (result.success) {
        await supabaseAdmin
          .from("checkout_sessions")
          .update({
            welcome_day2_sent: true,
            welcome_day2_sent_at: new Date().toISOString(),
          })
          .eq("id", session.id);
      }
    }
  }

  // Welcome Day 3: 3 days after purchase
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
  const { data: day3Sessions, error: day3Error } = await supabaseAdmin
    .from("checkout_sessions")
    .select("*")
    .eq("status", "completed")
    .eq("welcome_day2_sent", true)
    .eq("welcome_day3_sent", false)
    .lt("completed_at", threeDaysAgo.toISOString());

  if (day3Error) {
    console.error("Error fetching welcome day 3 sessions:", day3Error);
  } else if (day3Sessions && day3Sessions.length > 0) {
    console.log(`Found ${day3Sessions.length} sessions for welcome day 3 email`);
    for (const session of day3Sessions) {
      const result = await sendEmail(
        session.customer_email,
        welcomeSeriesEmails.day3.subject,
        welcomeSeriesEmails.day3.html(session.customer_name || "")
      );
      if (result.success) {
        await supabaseAdmin
          .from("checkout_sessions")
          .update({
            welcome_day3_sent: true,
            welcome_day3_sent_at: new Date().toISOString(),
          })
          .eq("id", session.id);
      }
    }
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type } = await req.json().catch(() => ({ type: "all" }));
    console.log("Running automation emails, type:", type);

    if (type === "abandoned" || type === "all") {
      await processAbandonedCartEmails();
    }

    if (type === "welcome" || type === "all") {
      await processWelcomeSeriesEmails();
    }

    if (type === "post_purchase" || type === "all") {
      await processPostPurchaseEmails();
    }

    return new Response(
      JSON.stringify({ success: true, processedAt: new Date().toISOString() }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in send-automation-emails:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
