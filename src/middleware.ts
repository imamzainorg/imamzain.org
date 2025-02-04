import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
	if (process.env.NODE_ENV == "development") {
		return NextResponse.next()
	}
	return NextResponse.redirect(new URL("/coming-soon", request.url))
}

export const config = {
	matcher: ["/media/audios", "/news/conferences"],
}
