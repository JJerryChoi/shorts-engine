import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, slug, platform } = body;

    // Simple server-side logging for now.
    // Replace with a real analytics store (SQLite, Postgres, etc.) later.
    console.log(
      JSON.stringify({
        ts: new Date().toISOString(),
        event,
        slug,
        platform: platform ?? null,
      }),
    );

    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 400 });
  }
}
