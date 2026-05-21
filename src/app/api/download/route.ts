import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url  = req.nextUrl.searchParams.get("url");
  const name = req.nextUrl.searchParams.get("name") ?? "file";

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

    // ✅ نحدد النوع والامتداد تلقائياً
    const ext = url.toLowerCase().split(".").pop();
    const typeMap: Record<string, string> = {
      pdf:  "application/pdf",
      mp3:  "audio/mpeg",
      mp4:  "video/mp4",
      wav:  "audio/wav",
    };
    const contentType = typeMap[ext ?? ""] ?? "application/octet-stream";
    const extension   = ext ?? "file";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(name)}.${extension}`,
        "Content-Length": buffer.byteLength.toString(),
      },
    });
  } catch {
    return new NextResponse("فشل التحميل", { status: 500 });
  }
}
