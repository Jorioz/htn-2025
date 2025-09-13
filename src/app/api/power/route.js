// src/app/api/power/route.js
import { NextResponse } from 'next/server';
import { clients, isInvalidClientId, removeClient } from '../connections';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const voltage = Number(searchParams.get('voltage'));
    const current = Number(searchParams.get('current'));
    const power = Number(searchParams.get('power'));
    const userId = Number(searchParams.get('userid'));
    console.log("userid",userId)
    if (isInvalidClientId(userId)) {
        return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }
    if (power < 0 || power === null) {
        return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const connection = clients.connections.get(userId);
    connection.totalPower += power;
    
    if (connection.stopRequested) {
        removeClient(userId);
    }

    return NextResponse.json({ stop: connection.stopRequested });
}

