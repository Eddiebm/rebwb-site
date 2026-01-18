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
        const { email, source } = await req.json();
        
        if (!email || !email.includes('@')) {
            return new Response(JSON.stringify({ error: 'Valid email required' }), {
                status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
        const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

        // Store in database
        const dbResponse = await fetch(`${SUPABASE_URL}/rest/v1/email_subscribers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
                'apikey': SUPABASE_SERVICE_ROLE_KEY,
                'Prefer': 'return=minimal',
            },
            body: JSON.stringify({
                email: email.toLowerCase().trim(),
                source: source || 'website',
                subscribed_at: new Date().toISOString(),
            }),
        });

        if (!dbResponse.ok && dbResponse.status !== 409) {
            // 409 = duplicate, which is fine
            const error = await dbResponse.text();
            console.error('DB error:', error);
        }

        return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
