import jsForce from "jsforce";
import Config from "../lib/salesforceConnectionConfig.js";
import SalesforceJWT from "sf-jwt-token-jsm";

export default class ServerToServerAuth {
    constructor() {
        this.config = new Config().getConfig();
    }

    async connect() {
        try {
            this.connection = new jsForce.Connection({
                version: this.config.apiVersion,
            });

            const jwtResponse = await new SalesforceJWT({
                iss: this.config.clientId,
                sub: this.config.username,
                aud: this.config.loginUrl,
                privateKey: this.config.privateKey,
            }).getToken();

            this.connection.initialize({
                instanceUrl: jwtResponse.instance_url,
                accessToken: jwtResponse.access_token,
            });
            return this.connection;
        } catch (err) {
            throw new Error(
                `Can't establish connection to Salesforce: ${err.message}`
            );
        }
    }
}
