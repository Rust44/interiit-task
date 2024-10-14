import Item from "@/models/Item";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { godownId: string } }) {
  try {
    const items = await Item.find({ godown_id: params.godownId });
    
    return NextResponse.json(items);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
