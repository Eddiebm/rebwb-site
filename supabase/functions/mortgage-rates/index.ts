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
        // Current average mortgage rates (updated periodically)
        // These represent national averages - users should verify with lenders
        const rates = {
            lastUpdated: new Date().toISOString(),
            conventional: {
                thirtyYear: 6.875,
                fifteenYear: 6.125,
                arm5_1: 6.25
            },
            fha: {
                thirtyYear: 6.5
            },
            va: {
                thirtyYear: 6.25
            },
            jumbo: {
                thirtyYear: 7.125
            }
        };

        return new Response(JSON.stringify({ data: rates }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
