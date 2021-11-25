import {
    getIndexOpts,
    postIndexOpts
} from "./schema.js";

export const indexPlugin = (fastify, options, done) => {
    try {
        fastify.get("/", getIndexOpts);
        fastify.post("/", postIndexOpts);

        done();
    } catch (err) {
        throw err;
    }
};