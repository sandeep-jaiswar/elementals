// app/api/predictStockMovement/route.ts
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your .env file
});

export async function POST(request: Request) {
  try {
    const { symbol, historicalData } = await request.json();

    if (!symbol || !historicalData) {
      return NextResponse.json(
        { error: 'Symbol and historical data are required' },
        { status: 400 }
      );
    }

    // Prepare the prompt for the model
    const prompt = `
      Given the historical stock data for ${symbol}, predict the stock movement for the next day.
      Historical data: ${JSON.stringify(historicalData)}
    `;

    // Call the OpenAI API to get predictions
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 50,
    });

    const prediction = response.choices[0]?.message?.content?.trim();

    return NextResponse.json({ prediction });
  } catch (error) {
    console.error('Error predicting stock movement:', error);
    return NextResponse.json(
      { error: 'Failed to predict stock movement', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
