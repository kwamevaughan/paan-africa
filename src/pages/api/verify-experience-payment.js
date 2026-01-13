import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { reference, bookingId } = req.body;

  if (!reference || !bookingId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Initialize Supabase client
  let supabase = null;
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
  }

  try {
    // Verify payment with Paystack
    const verifyResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const verifyData = await verifyResponse.json();

    if (!verifyData.status || verifyData.data.status !== "success") {
      return res.status(400).json({ 
        message: "Payment verification failed",
        data: verifyData 
      });
    }

    const paymentData = verifyData.data;

    // Update booking in database
    if (supabase) {
      const { error: updateError } = await supabase
        .from("experience_bookings")
        .update({
          payment_status: 'paid',
          booking_status: 'confirmed',
          payment_reference: reference,
          payment_method: paymentData.channel || 'card',
          payment_gateway_response: paymentData,
          confirmed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', bookingId);

      if (updateError) {
        console.error("Error updating booking:", updateError);
        return res.status(500).json({ 
          message: "Payment verified but failed to update booking",
          error: updateError.message 
        });
      }
    }

    // Send confirmation email (you can add this here)

    return res.status(200).json({ 
      message: "Payment verified and booking confirmed",
      bookingId: bookingId,
      reference: reference,
      paymentData: paymentData
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({ message: "Error verifying payment", error: error.message });
  }
}

