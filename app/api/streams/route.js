import { NextResponse } from 'next/server';
import { getActiveStreams } from '../../../lib/db';

// عام: يرجع روابط البث النشطة فقط (15 د قبل حتى انتهاء المباراة)
export const revalidate = 0;

export async function GET() {
  try {
    const streams = await getActiveStreams();
    return NextResponse.json({ streams });
  } catch (e) {
    return NextResponse.json({ streams: [], error: e.message });
  }
}
