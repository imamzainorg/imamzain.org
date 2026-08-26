import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTNAME = process.env.ALLOWED_HOSTNAME;

// The `name` query param is still accepted for URL compatibility but ignored:
// filenames come from the Content-Disposition metadata stored on the R2 objects.
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return new NextResponse("Missing url", { status: 400 });
  }

  // Protocol-relative input ("//host/path") must not reach this branch, since
  // new URL() would resolve it to a foreign host and open-redirect through us.
  if (url.startsWith("/") && !url.startsWith("//")) {
    return NextResponse.redirect(new URL(url, req.nextUrl.origin), 302);
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    return new NextResponse("Invalid url", { status: 400 });
  }

  if (!ALLOWED_HOSTNAME || parsedUrl.hostname !== ALLOWED_HOSTNAME) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return NextResponse.redirect(parsedUrl, 302);
}
