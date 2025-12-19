import { supabase } from '@/lib/supabase';


export async function POST(req) {
const { playerId, day, guessedSanta, confidence, rating } = await req.json();


if (!playerId || !day || !guessedSanta || confidence == null || !rating) {
return Response.json({ error: 'Invalid input' }, { status: 400 });
}


const { error } = await supabase
.from('daily_submissions')
.insert({
player_id: playerId,
day,
guessed_santa: guessedSanta,
confidence,
rating,
locked: true
});


if (error) {
return Response.json({ error: 'Already submitted for today' }, { status: 400 });
}


return Response.json({ success: true });
}