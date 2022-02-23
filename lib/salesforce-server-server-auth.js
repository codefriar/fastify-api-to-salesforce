import jsForce from "jsforce";
import Config from "../lib/salesforceConnectionConfig.js";
import SalesforceJwt from "sf-jwt-token";

export default class ServerToServerAuth {
    constructor() {
        this.config = new Config().getConfig();
    }

    async connect() {
        try {
            this.connection = new jsForce.Connection({
                version: this.config.apiVersion,
            });

            const jwtResponse = await SalesforceJwt.getToken({
                iss: this.config.clientId,
                sub: this.config.username,
                aud: this.config.loginUrl,
                privateKey: this.config.privateKey,
            });

            this.conn.initialize({
                instanceUrl: jwtResponse.instance_url,
                accessToken: jwtResponse.access_token,
            });
            return this.conn;
        } catch (err) {
            throw new Error(
                `Can't establish connection to Salesforce: ${err.message}`
            );
        }
    }
}
