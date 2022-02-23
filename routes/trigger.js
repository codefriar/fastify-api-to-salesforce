import jsForce from "jsforce";
import s2s from "../lib/salesforce-server-server-auth.js";
import sfAccount from "../models/sfAccount.js";
import fetch from "node-fetch";

export default class ApiMiddleware {
    async fetchParseAndCreate(request, reply) {
        /**
         * Lets pretend our POST request that kicks this off gives us the fully qualified REST URI for the api.
         * Let's also pretend our third party api has no authentication needs.
         * In that case, we're going to:
         * 1. Make a GET request to the REST URI
         * 2. Parse the response JSON into our 'records'
         * 3. Authenticate to Salesforce via JWT Server-to-server flow.
         * 4. Create records in Salesforce.
         */

        let payload = JSON.parse(request.body);
        console.debug(payload);
        const JsonBody = await this.makeAPIRequest(payload.uri);
        return await this.createRecordsInSalesforce(JsonBody);
    }

    // makes a fetch call, parses response to json.
    async makeAPIRequest(uri) {
        const response = await fetch(uri);
        return await response.json();
    }

    /**
     * we're just going to assume that the 'records' key of the json contains things we want to put into Salesforce.
     */
    async createRecordsInSalesforce(json) {
        this.connection = new s2s().connect();
        let records = [];
        json.records.forEach((record) => {
            records.push(new sfAccount(record).account);
        });
        console.debug(records);
        try {
            job = connection.bulk.insert("Account", "insert");
            batch = job.createBatch();
            batch.execute(records);
            // listen for events
            batch.on("queue", function (batchInfo) {
                batch.poll(1000, 2000);
            });
            batch.on("response", function (batchInfo) {
                return batchInfo.response;
            });
        } catch (err) {
            console.log(err);
            throw new Error(
                `Can't create records in Salesforce: ${err.message}`
            );
        }
    }
}
