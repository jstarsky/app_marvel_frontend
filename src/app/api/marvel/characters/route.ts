import { NextResponse } from "next/server";
import serverMarvel from "@/lib/server/marvel";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limit = Number(url.searchParams.get("limit"));
    const nameStartsWith = url.searchParams.get("nameStartsWith") || undefined;
    const offset = Number(url.searchParams.get("offset")) || undefined;
    const params: Record<string, string | number | undefined> = {
      limit,
      nameStartsWith,
      offset,
    };
    const res = await serverMarvel.get("/characters", { params });
    return NextResponse.json(res.data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || String(err) },
      { status: 500 }
    );
  }
}
