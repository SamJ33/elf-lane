import { supabase } from '@/lib/supabase';


export async function POST(req) {
const { name, recipientHash } = await req.json();


if (!name || !recipientHash) {
return Response.json({ error: 'Invalid input' }, { status: 400 });
}


const { data, error } = await supabase
.from('players')
.insert({ name, recipient_hash: recipientHash })
.select('id')
.single();


if (error) {
return Response.json({ error: error.message }, { status: 500 });
}


return Response.json({ playerId: data.id });
}