import { NextResponse } from "next/server";
import Item from "@/models/Item";

export async function GET () {
  try {
    const items = await Item.find();
    return NextResponse.json(items);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}