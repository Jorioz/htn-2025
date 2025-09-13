// src/app/api/power/route.js
import { NextResponse } from 'next/server';
import { clients, isInvalidClientId, removeClient } from '../connections';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const delta = Number(searchParams.get('delta'));
    const userId = Number(searchParams.get('userid'));

    if (isInvalidClientId(userId)) {
        return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }
    if (!delta || delta <= 0) {
        return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const connection = clients.connections.get(userId);
    connection.totalPower += delta;
    
    if (connection.stopRequested) {
        removeClient(userId);
    }

    return NextResponse.json({ stop: connection.stopRequested });
}

