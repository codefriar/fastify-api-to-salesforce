// Imports the module defining the /trigger route
import ApiMiddleware from "./trigger.js";

// as you build out your app, you'll have more of these.

export async function routes(fastify, options) {
    // This is a diagnostic default route.
    fastify.get("/", async (request, reply) => {
        return { hello: "world" };
    });

    /**
     * While the route's logic is stored in trigger.js, here
     * is where we associate the actual rest route '/trigger'
     * with the logic we want executed when the route is triggered.
     *
     * You could make an argument that 'routes' is a bad name for
     * the folder containing this logic, and you could argue that you should
     * do the association in trigger.js, but I think it's better to keep
     * the association here so that you can always see, in one file, the active
     * routes.
     */
    // This route's work is done in the trigger.js file
    fastify.post("/trigger", async (request, reply) => {
        /**
         * This is where you *should* check to make sure the request is legit.
         * For example, you could check to make sure the request is coming from a trusted ip address
         * or you could check to make sure the posted body contains a shared secret
         * or you could decrypt the post body...
         *
         * Pick > 1 and do it. I'm not doing it here, because I wanted to get this example out quickly.
         */

        /**
         * This route's work is done in the trigger.js file
         * We imported the ApiMiddleware class from the trigger.js file
         * here we'll instantiate an instance and call the fetchParseAndCreate
         * method, with the Fastify provided (dependency injected) request and reply
         * objects.
         */
        await new ApiMiddleware().fetchParseAndCreate(request, reply);
    });
}
