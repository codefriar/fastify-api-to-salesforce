/**
 * This is the 'server' file - what you'll execute in your Heroku Procfile to start your app.
 * It's a simple fastify app with two quirks.
 * 1. It uses ESM (ES Modules) not CommonJS (Node.js) modules. Why? Because I like them better.
 * 2. It has a fairly opinionated file structure.
 */

// Import the Fastify framework
import Fastify from "fastify";

// Setup the logger
const fastify = Fastify({
    logger: true,
    prettyPrint: true,
});

// Import our routes
import { routes } from "./routes/index.js";

// Tell Fastify to use our routes
fastify.register(routes);

// Actually start the server.
const start = async () => {
    const port = process.env.PORT || 3000;
    try {
        await fastify.listen(port, "0.0.0.0");
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
