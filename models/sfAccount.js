/**
 * This class 'models' a Salesforce Account.
 * It also handles translating the third-party service's
 * api results to Salesforce Account objects.
 *
 * Some of you may astutely realize that this is seemingly
 * unnecessary. However, that's only because the demo third
 * party api returns the output of a salesforce query.
 */
export default class SfAccount {
    /**
     * Map is a specific key->value store javascript object structure.
     * Each entry in the map is represented by an array of two elements.
     * The left element of the map represents the key in the third party
     * api's response. The right element represents the key name in
     * the Salesforce Account object.
     */
    #mappedProperties = new Map([
        ["name", "name"],
        ["NumberOfEmployees", "NumberOfEmployees"],
        ["phone", "phone"],
        ["website", "website"],
        ["billingStreet", "billingStreet"],
        ["billingCity", "billingCity"],
        ["billingState", "billingState"],
        ["billingPostalCode", "billingPostalCode"],
        ["billingCountry", "billingCountry"],
        ["shippingStreet", "shippingStreet"],
        ["shippingCity", "shippingCity"],
        ["shippingState", "shippingState"],
        ["shippingPostalCode", "shippingPostalCode"],
        ["shippingCountry", "shippingCountry"],
        ["industry", "industry"],
        ["type", "Type"],
        ["annualrevenue", "annualrevenue"],
        ["description", "description"],
    ]);
    // a property for the created account.
    account = {};

    /**
     * I chose to do the mapping here in the constructor because
     * that's all I'll ever need for my current use case.
     */
    constructor(jsonRecord) {
        this.#mappedProperties.forEach((jsonKey, sfKey) => {
            this.account[sfKey] = jsonRecord[jsonKey];
        });
    }
}
