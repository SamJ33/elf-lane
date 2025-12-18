import { supabase } from '@/lib/supabase';


export async function GET() {
const { data: players } = await supabase.from('players').select('*');


if (!players.every(p => p.finalized)) {
return Response.json({ error: 'Game not finished' }, { status: 403 });
}


const { data: submissions } = await supabase.from('daily_submissions').select('*');


// Best Santa
const ratings = {};
players.forEach(p => ratings[p.id] = []);


submissions.forEach(s => {
ratings[s.guessed_santa]?.push(s.rating);
});

const bestSanta = players.map(p => ({
name: p.name,
avgRating: ratings[p.id].reduce((a, b) => a + b, 0) / ratings[p.id].length || 0
})).sort((a, b) => b.avgRating - a.avgRating);


// Best Guesser
const guessScore = {};
players.forEach(p => guessScore[p.id] = 0);


submissions.forEach(s => {
const correct = players.find(p => p.id === s.guessed_santa)?.recipient_hash;
guessScore[s.player_id] += s.confidence;
});


const bestGuesser = players.map(p => ({
name: p.name,
score: guessScore[p.id]
})).sort((a, b) => b.score - a.score);


return Response.json({ bestSanta, bestGuesser });
}