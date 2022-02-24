import jsForce from "jsforce";
import Config from "../lib/salesforceConnectionConfig.js";
import SalesforceJWT from "sf-jwt-token-jsm";

/**
 * this class is responsible for creating a JSforce connection
 * it does so via a JWT Server to server flow.
 * it uses the sf-jwt-token-jsm library that I kinda wrote
 * to do this.
 */
export default class ServerToServerAuth {
    #config = {};

    constructor() {
        this.#config = new Config().getConfig();
    }

    async connect() {
        try {
            // Create an empty connection object with only the api version set
            this.connection = new jsForce.Connection({
                version: this.#config.apiVersion,
            });

            // create a jwt token. See sf-jwt-token-jsm for details
            const jwtResponse = await new SalesforceJWT({
                iss: this.#config.clientId,
                sub: this.#config.username,
                aud: this.#config.loginUrl,
                privateKey: this.#config.privateKey,
            }).getToken();

            // use the auth token from the jwt flow to initialize the connection
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
