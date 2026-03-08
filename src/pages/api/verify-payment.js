export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference');
  
    if (!reference) {
      return Response.json({ error: 'Reference required' }, { status: 400 });
    }
  
    try {
      const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: { 'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return Response.json({ error: data.message || 'Verification failed' }, { status: response.status });
      }
  
      return Response.json(data);
    } catch (error) {
      return Response.json({ error: 'Failed to reach Paystack' }, { status: 502 });
    }
  }