import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET() {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
await page.goto('https://www.sistani.org/', { waitUntil: 'domcontentloaded' });

   
    const dateText = await page.$eval('#home-date', el => el.textContent?.trim()).then(text => text?.split('||')[0] || '');
    await browser.close();

    if (!dateText) {
      return NextResponse.json({ error: '' }, { status: 500 });
    }

    return NextResponse.json({ hijriDate: dateText });
  }  catch (error: unknown) {
  if (error instanceof Error) {
    console.error('Error fetching hijri date:', error.message);
    return NextResponse.json({ error: '' }, { status: 500 });
  } else {
    console.error('Unknown error:', error);
    return NextResponse.json({ error: '' }, { status: 500 });
  }
}}
