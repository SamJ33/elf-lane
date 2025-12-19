import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { hashName } from "@/lib/hash";

export async function POST(req) {
  const { player, giftTarget } = await req.json();

  const giftHash = hashName(giftTarget);

  await supabase.from("players").insert({
    name: player,
    gift_hash: giftHash,
  });

  return NextResponse.json({ success: true });
}
