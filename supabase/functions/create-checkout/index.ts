Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
        const { items, email, success_url, cancel_url } = await req.json();
        const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
        
        if (!STRIPE_SECRET_KEY) {
            return new Response(JSON.stringify({ error: 'Stripe not configured' }), {
                status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        // Build line items for Stripe
        const lineItems = items.map((item: any) => ({
            price_data: {
                currency: 'usd',
                product_data: { name: item.name },
                unit_amount: item.price * 100, // cents
            },
            quantity: 1,
        }));

        // Create Stripe checkout session
        const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'mode': 'payment',
                'success_url': success_url,
                'cancel_url': cancel_url,
                'customer_email': email,
                ...lineItems.reduce((acc: any, item: any, i: number) => {
                    acc[`line_items[${i}][price_data][currency]`] = item.price_data.currency;
                    acc[`line_items[${i}][price_data][product_data][name]`] = item.price_data.product_data.name;
                    acc[`line_items[${i}][price_data][unit_amount]`] = item.price_data.unit_amount.toString();
                    acc[`line_items[${i}][quantity]`] = item.quantity.toString();
                    return acc;
                }, {}),
            }).toString(),
        });

        const session = await response.json();
        
        if (session.error) {
            return new Response(JSON.stringify({ error: session.error.message }), {
                status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ url: session.url }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
