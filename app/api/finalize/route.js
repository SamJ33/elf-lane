import { supabase } from '@/lib/supabase';


export async function POST(req) {
const { playerId } = await req.json();


await supabase
.from('players')
.update({ finalized: true })
.eq('id', playerId);


const { data } = await supabase
.from('players')
.select('finalized');


const allFinalized = data.every(p => p.finalized);


return Response.json({ allFinalized });
}