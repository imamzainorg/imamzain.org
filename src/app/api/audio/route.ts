// app/api/audio/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  if (!url) return new NextResponse('Missing url', { status: 400 })

  const decodedUrl = decodeURIComponent(url)
  const rangeHeader = request.headers.get('range')

  // أرسل Range header للسيرفر الأصلي إذا وجد
  const fetchHeaders: HeadersInit = {}
  if (rangeHeader) {
    fetchHeaders['Range'] = rangeHeader
  }

  const response = await fetch(decodedUrl, { headers: fetchHeaders })

  if (!response.ok && response.status !== 206) {
    return new NextResponse('Failed to fetch audio', { status: 502 })
  }

  const contentType =
    response.headers.get('Content-Type') ?? 'audio/mpeg'
  const contentLength = response.headers.get('Content-Length')
  const contentRange = response.headers.get('Content-Range')
  const acceptRanges = response.headers.get('Accept-Ranges') ?? 'bytes'

  const headers: Record<string, string> = {
    'Content-Type': contentType,
    'Accept-Ranges': acceptRanges,
    'Cache-Control': 'public, max-age=86400',
  }

  if (contentLength) headers['Content-Length'] = contentLength
  if (contentRange) headers['Content-Range'] = contentRange

  // stream مباشرة بدون تحميل الملف كله بالذاكرة
  return new NextResponse(response.body, {
    status: response.status, // 206 إذا كان range request، 200 غيره
    headers,
  })
}