import fs from 'fs';
import { ROOT_DIR } from '../../constants';
import HostipWebSocket from '../websocket/host-ip-websocket';
import InitialiseMessage from '../messages/initialise-message';
import InvalidSubscriptionMessage from '../messages/invalid-subscription-message';
import config from '../../config';
import ClientMessage from '../messages/client-message';

const authorize = async(message: InitialiseMessage, websocket: HostipWebSocket, randomSubdomain: string) : Promise<boolean> => {
    const { apiKey } = message;

    if (apiKey !== config.server.apiKey) {
        const invalidSubscriptionMessage : ClientMessage = {
            type: "clientMessage",
            message: 'Invalid API Key!'
        }

        websocket.sendMessage(invalidSubscriptionMessage);
        websocket.close();
        return false;
    }

    // const apiKeys = JSON.parse(fs.readFileSync(ROOT_DIR + "/src/authentication/apiKeys.json").toString());

    // const apiKeyRecord = apiKeys.find((record: any) => {
    //     return record.apiKey == apiKey;
    // });

    // // No API key record. Send back a message, close the connection and return false 
    // if (typeof apiKeyRecord == 'undefined') {
    //     const invalidSubscriptionMessage : InvalidSubscriptionMessage = {
    //         type: "invalidSubscription",
    //         apiKey: apiKey
    //     }

    //     websocket.sendMessage(invalidSubscriptionMessage);
    //     websocket.close();
    //     return false;
    // }

    return true;
}

export {
    authorize
}