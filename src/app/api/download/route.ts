import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTNAME = process.env.ALLOWED_HOSTNAME;

// The `name` query param is still accepted for URL compatibility but ignored:
// filenames come from the Content-Disposition metadata stored on the R2 objects.
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return new NextResponse("Missing url", { status: 400 });
  }

  // Treat a path-style input as a same-origin file. A string-prefix check can't
  // safely decide this: the WHATWG URL parser folds backslashes to slashes and
  // strips tabs/newlines for http(s), so "/\evil.com" or "/\t/evil.com" would
  // resolve to a foreign host. Resolve first, then verify the origin actually
  // matches ours before redirecting, so nothing can escape the origin.
  if (url.startsWith("/")) {
    const resolved = new URL(url, req.nextUrl.origin);
    if (resolved.origin !== req.nextUrl.origin) {
      return new NextResponse("Forbidden", { status: 403 });
    }
    return NextResponse.redirect(resolved, 302);
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
