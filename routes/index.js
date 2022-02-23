import ApiMiddleware from "./trigger.js";

export async function routes(fastify, options) {
    // This is a diagnostic default route.
    fastify.get("/", async (request, reply) => {
        return { hello: "world" };
    });

    // This route's work is done in the trigger.js file
    fastify.post("/trigger", async (request, reply) => {
        // this is where you *should* check to make sure the request is legit

        await new ApiMiddleware().fetchParseAndCreate(request, reply);
    });
}
