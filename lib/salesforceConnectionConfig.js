import "dotenv/config";
export default class Config {
    static defaultSalesforceApiVersion = "54.0";

    constructor() {
        let requiredEnvVars = [
            "SF_CLIENT_ID",
            "SF_CLIENT_SECRET",
            "PRIVATE_KEY",
            "SF_LOGIN_URL",
            "SF_USERNAME",
        ];
        requiredEnvVars.forEach((envVar) => {
            if (!process.env[envVar]) {
                console.error(`Missing ${envVar} environment variable`);
                process.exit(-1);
            }
        });
    }

    getConfig() {
        return {
            apiVersion: Config.defaultSalesforceApiVersion,
            clientId: process.env.SF_CLIENT_ID,
            clientSecret: process.env.SF_CLIENT_SECRET,
            loginUrl: process.env.SF_LOGIN_URL,
            username: process.env.SF_USERNAME,
            privateKey: process.env.PRIVATE_KEY,
        };
    }
}
