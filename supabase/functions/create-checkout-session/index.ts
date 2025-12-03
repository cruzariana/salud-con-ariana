import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2025-08-27.basil",
});

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Creating checkout session for:", email);

    // Get origin from request headers
    const origin = req.headers.get("origin") || "https://giro180.com";

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      line_items: [
        {
          price: "price_1RSY3zRsiVfYqvlYdTq4eqEJ", // Starter Kit price ID
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/compra-exitosa?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/guia-completa`,
      metadata: {
        customer_name: name || "",
        customer_email: email,
      },
    });

    console.log("Stripe session created:", session.id);

    // Save checkout session to database for tracking
    const { error: dbError } = await supabaseAdmin
      .from("checkout_sessions")
      .insert({
        stripe_session_id: session.id,
        customer_email: email,
        customer_name: name || null,
        status: "pending",
        amount_total: session.amount_total,
        currency: session.currency || "usd",
      });

    if (dbError) {
      console.error("Error saving checkout session to DB:", dbError);
      // Don't fail the request, just log the error
    } else {
      console.log("Checkout session saved to database");
    }

    return new Response(
      JSON.stringify({ url: session.url, sessionId: session.id }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
