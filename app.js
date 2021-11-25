import Fastify from "fastify";
import fastifySwagger from "fastify-swagger";
import { indexPlugin } from "./routes/index/plugin.js";

const app = Fastify();

app.register(fastifySwagger, {
    exposeRoute: true,
    routePrefix: "/docs",
    swagger: {
        info: { title: "checksig-api" }
    },
});

app.register(indexPlugin, {
    prefix: "/index"
});

export default app;