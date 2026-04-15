import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return new NextResponse("Missing url", { status: 400 });

  const res = await fetch(url);
  const blob = await res.arrayBuffer();

  return new NextResponse(blob, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="file.pdf"`,
    },
  });
}