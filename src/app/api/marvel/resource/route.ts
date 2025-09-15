import { NextResponse } from "next/server";
import serverMarvel from "@/lib/server/marvel";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const path = url.searchParams.get("path") || undefined;
    const res = await serverMarvel.get(path || "/");
    return NextResponse.json(res.data);
  } catch (err: Error | unknown) {
    if (err instanceof Error) {
      return NextResponse.json(
        { error: err.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}
