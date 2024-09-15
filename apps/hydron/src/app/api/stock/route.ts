// app/api/stock/route.ts
import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol'); // e.g., AAPL, TSLA, etc.

    if (!symbol) {
      return NextResponse.json({ error: 'No stock symbol provided' }, { status: 400 });
    }

    // Fetch stock data from Yahoo Finance
    const stockData = await yahooFinance.quote(symbol);

    return NextResponse.json(stockData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
  }
}
