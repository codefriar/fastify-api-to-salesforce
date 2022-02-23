export default class SfAccount {
    // represents the mapping between the json object's keys and the Salesforce objects keys.
    mappedProperties = {
        accountName: "Name",
        accountNumber: "AccountNumber",
        accountSource: "AccountSource",
        phoneNumber: "Phone",
        faxNumber: "Fax",
        website: "Website",
        billingStreet: "BillingStreet",
        billingCity: "BillingCity",
        billingState: "BillingState",
        billingPostalCode: "BillingPostalCode",
        billingCountry: "BillingCountry",
        someRandomProperty: "custom_Property__c",
    };

    constructor(jsonRecord) {
        this.account = {};
        mappedProperties.forEach(([jsonKey, sfKey]) => {
            this.account[sfKey] = jsonRecord[jsonKey];
        });
    }
}
