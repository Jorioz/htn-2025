import { NextResponse } from 'next/server';
import { clients, isInvalidClientId, removeClient } from '../connections';

/**
 * Stops a client given a user ID.
 * 
 * @param {number} userId - user ID of the client to stop
 * @returns {Promise<NextResponse>} - HTTP response with status 200 if successful, 404 if client is not found
 * @throws {Error} - if client is not found
 */
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId = Number(searchParams.get('userid'));

    if (isInvalidClientId(userId)) {
        return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    clients.connections.get(userId).stopRequested = true;

    return NextResponse.json({}, { status: 200 });
}
