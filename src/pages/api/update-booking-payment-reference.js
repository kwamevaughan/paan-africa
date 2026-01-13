import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { bookingId, paymentReference } = req.body;

  if (!bookingId || !paymentReference) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Initialize Supabase client
  let supabase = null;
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
  } else {
    return res.status(200).json({ message: "Supabase not configured, skipping update" });
  }

  try {
    // Skip if it's a temporary ID
    if (bookingId.startsWith('temp_')) {
      return res.status(200).json({ message: "Temporary booking ID, skipping database update" });
    }

    const { error } = await supabase
      .from("experience_bookings")
      .update({
        payment_reference: paymentReference,
        updated_at: new Date().toISOString(),
      })
      .eq('id', bookingId);

    if (error) {
      console.error("Error updating booking with payment reference:", error);
      return res.status(500).json({ message: "Failed to update booking", error: error.message });
    }

    return res.status(200).json({ message: "Booking updated successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ message: "Error updating booking", error: error.message });
  }
}

