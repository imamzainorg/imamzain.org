import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTNAME = "cdn.imamzain.org";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  const name = req.nextUrl.searchParams.get("name") ?? "audio";

  if (!url) return new NextResponse("Missing url", { status: 400 });

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return new NextResponse("Invalid url", { status: 400 });
  }

  if (parsed.hostname !== ALLOWED_HOSTNAME) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Fetch failed");

    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(name)}.mp3`,
        "Content-Length": buffer.byteLength.toString(),
      },
    });
  } catch {
    return new NextResponse("فشل التحميل", { status: 500 });
  }
}
