/**
 * This is the 'server' file - what you'll execute in your Heroku Procfile to start your app.
 * It's a simple fastify app with two quirks.
 * 1. It uses ESM (ES Modules) not CommonJS (Node.js) modules. Why? Because I like them better.
 * 2. It has a fairly opinionated file structure.
 */

// Import the Fastify framework
// Fastify works with both Common.js (node.js) and ESM (ES Modules).
// The ESM version is recommended for production.
// I chose to build this entirely with ESM modules because it's a lot easier to work with.
// and LWC uses ESM modules.
import Fastify from "fastify";

// Setup the the Fastify  logger. I like pretty formatted logging
// so I included pino-pretty in the dev-dependencies.
const fastify = Fastify({
    logger: true,
    prettyPrint: true,
});

/**
 * It's entirely possible to put all your logic into this server.js file
 * but that's ugly, and we can do better.
 * In this app, 'routes' refer to restful routes and they are defined in
 * their own files under routes/
 *
 * The routes/index.js file imports individual routes. As you build out
 * your app, you'll add more routing files, and then add them to index.js
 */

// Import our routes
import { routes } from "./routes/index.js";

/**
 * This line pulls all routes known to routes/index.js and registers them
 * with Fastify.
 */
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
