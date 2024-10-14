import Godown from "@/models/Godown";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const godowns = await Godown.find();
    return NextResponse.json(godowns);
  } catch (error) {
    console.log(error);
    return NextResponse.json("Failed to fetch godowns", {status: 500});
  }
}