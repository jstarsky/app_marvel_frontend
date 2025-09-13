import { NextResponse } from "next/server";
import serverMarvel from "@/lib/server/marvel";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
  const limit = Number(url.searchParams.get("limit") || "20");
  const params: Record<string, string | number | undefined> = { limit };
    const res = await serverMarvel.get("/characters", { params });
    return NextResponse.json(res.data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
