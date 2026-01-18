Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
        const { postal_code, status, limit = 50 } = await req.json();

        if (!postal_code) {
            return new Response(JSON.stringify({ error: 'postal_code is required' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        const RAPIDAPI_KEY = '9a82422bc0mshb29dcd55751d639p12d837jsn1b60690af312';

        const response = await fetch('https://realty-in-us.p.rapidapi.com/properties/v3/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-rapidapi-host': 'realty-in-us.p.rapidapi.com',
                'x-rapidapi-key': RAPIDAPI_KEY
            },
            body: JSON.stringify({
                limit: limit,
                offset: 0,
                postal_code: postal_code,
                status: status || ['for_sale', 'sold', 'for_rent'],
                sort: { direction: 'desc', field: 'list_date' }
            })
        });

        const data = await response.json();

        return new Response(JSON.stringify({ data }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
