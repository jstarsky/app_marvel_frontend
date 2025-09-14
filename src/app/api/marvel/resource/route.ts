import { NextResponse } from "next/server";
import serverMarvel from "@/lib/server/marvel";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const path = url.searchParams.get("path") || undefined;
    const res = await serverMarvel.get(path || "/");
    return NextResponse.json(res.data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || String(err) },
      { status: 500 }
    );
  }
}
