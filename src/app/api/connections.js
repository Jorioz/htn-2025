/**
 * Stores the global connection + additional data.
 */

/**
 * Details of a connection.
 */
export class ConnectionDetails {
    constructor () {
        this.stopRequested = false;
        this.totalPower = 0;
    }
}

/**
 * @type { connections: Map<number, ConnectionDetails>, idCounter: number }
 * 
 * Id generating convention. Take current, and then increment.
 */
export const clients = {
    connections: new Map(),
    idCounter: 0
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
