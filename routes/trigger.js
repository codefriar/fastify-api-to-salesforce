// Some modules we'll use in this class:
// JSForce is a library for interacting with Salesforce APIs.
import jsForce from "jsforce";
// This is a custom-to-this-project module that handles
// authenticating with Salesforce in a jwt, server-to-server flow.
import s2s from "../lib/salesforce-server-server-auth.js";
// This is a custom-to-this-project module that models the
// external api's schema and maps it to a Salesforce Account
// schema.
import sfAccount from "../models/sfAccount.js";
// This is a polyfill that provides fetch access to node
import fetch from "node-fetch";
// This is a node built-in that provides a promise wrapper for
// evented work.
import once from "events";

/**
 * This class is responsible for making our third party api call,
 * mapping the response to Salesforce objects and inserting
 * them into Salesforce.
 */
export default class ApiMiddleware {
    #connection = {};
    async fetchParseAndCreate(request, reply) {
        // we trigger this work by posting a json body to the /trigger route.
        // that body contains a URL parameter, that's used to make the third
        // party api call.
        // For a number of reasons this is... unsafe. Please do request validation.
        let payload = JSON.parse(request.body);
        const JsonBody = await this.makeAPIRequest(payload.uri);
        const response = await this.createRecordsInSalesforce(JsonBody);

        // this just sets the response code based on whether or not *all*
        // of the records were successfully created in Salesforce.
        if (response.every((obj) => obj.success)) {
            reply.code(200);
        } else {
            reply.code(500);
        }

        // reply.send is the Fastify built-in to return data to the requester.
        // if you don't return data... the request hangs.
        reply.send(response);
    }

    /**
     * Makes a fetch call, parses response to json.
     * Simple? yes. this is why you should use fetch.
     */

    async makeAPIRequest(uri) {
        const response = await fetch(uri);
        return await response.json();
    }

    /**
     * This method takes the response from the third party api call
     * and maps it to Salesforce Objects
     * then uses JsForce's bulk api to insert records into Salesforce
     */
    async createRecordsInSalesforce(json) {
        // instantiate a new jsForce connection via JWT auth (server 2 server flow)
        this.#connection = await new s2s().connect();

        let records = [];
        // iterate over the response from the third party api call's records property
        // with each 'record' from the external api, convert it to a SF record.
        // see models/sfAccount for more details.
        json.records.forEach((record) => {
            records.push(new sfAccount(record).account);
        });

        try {
            const job = this.#connection.bulk.createJob("Account", "insert");
            const batch = job.createBatch();
            batch.execute(records);
            batch.on("queue", function (batchInfo) {
                batch.poll(1000, 2000);
            });

            /**
             * remember the import of `once` above? here's where we use it.
             * JsForce is organized to use events to handle async work.
             * (at least for the Bulk API)
             * Because we're using Async/Await here, we need a way to promisify
             * the event handling so this method doesn't prematurely return.
             *
             * Note the return await here. That waits until the anoymous functions
             * return before continuing.
             */
            return await batch.once("response", function (batchInfo) {
                return batchInfo;
            });
        } catch (err) {
            console.log(err);
            throw new Error(
                `Can't create records in Salesforce: ${err.message}`
            );
        }
    }
}
