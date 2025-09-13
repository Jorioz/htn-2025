
import { NextResponse } from 'next/server';
import { clients, ConnectionDetails } from '../connections';

export async function GET(req) {
    const clientId = clients.idCounter++;

    clients.connections.set(clientId, new ConnectionDetails());

    return NextResponse.json({ userid: clientId });
}
