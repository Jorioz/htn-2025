import { NextResponse } from 'next/server';
import { isInvalidClientId, getStats, clients } from '../connections';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId = Number(searchParams.get('userid'));

    if (isInvalidClientId(userId)) {
        return NextResponse.json(null, { status: 200 });
    }

    const stats = getStats(userId);

    return NextResponse.json(stats, { status: 200 });
}
