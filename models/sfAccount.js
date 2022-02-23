export default class SfAccount {
    // represents the mapping between the json object's keys and the Salesforce objects keys.
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
    account = {};

    constructor(jsonRecord) {
        this.#mappedProperties.forEach((jsonKey, sfKey) => {
            this.account[sfKey] = jsonRecord[jsonKey];
        });
    }
}
