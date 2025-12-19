import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { playerId, guessedSantaId } = await req.json();

    const { data, error } = await supabase
      .from("guesses")
      .insert([{ player_id: playerId, guessed_santa: guessedSantaId }]);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: "Guess saved!" }));
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
  }
}
