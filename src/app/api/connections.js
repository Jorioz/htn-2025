/**
 * Stores the global connection + additional data.
 */
import { format } from 'date-fns';

/**
 * Details of a connection.
 */
export class ConnectionDetails {
    constructor () {
        this.stopRequested = false;
        this.totalPower = 0;
        this.time = Date.now();
    }
}

/**
 * @type { connections: Map<number, ConnectionDetails>, idCounter: number }
 * 
 * Id generating convention. Take current, and then increment.
 */
export const clients = {
    connections: new Map(),
    idCounter: 1
};

/**
 * Disconnects a client assuming a stop request has been communicated with the receiver client already.
 * 
 * @param {number} clientId
 */
export function removeClient(clientId) {
    if (!clients.connections.has(clientId)) {
        throw new Error('Client not found on client disconnect.');
    }

    const connection = clients.connections.get(clientId);
    console.log(`Client finished with ${connection.totalPower} power.`);
    clients.connections.delete(clientId);
}

export function isInvalidClientId(id) {
    if (id === undefined) {
        return true;
    }
    return !clients.connections.has(id);
}

export function getStats(id) {
    if (isInvalidClientId(id)) {
        return null;
    }

    const rate = 0.25;
    const connection = clients.connections.get(id);

    function formatTime(time) {
        time /= 1000;

        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.round(time % 60);
        let currentTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

        if (hours < 1 && minutes < 10) {
            currentTime += `:${String(seconds).padStart(2, '0')}`;
        }

        return currentTime;
    }

    const time = formatTime(Date.now() - connection.time);
    return {
        power: connection.totalPower,
        time: time,
        cost: connection.totalPower * rate,
        rate: rate
    };
}
