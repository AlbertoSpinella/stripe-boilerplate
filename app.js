import Fastify from "fastify";
import fastifySwagger from "fastify-swagger";
import { stripePlugin } from "./routes/stripe/plugin.js";

const app = Fastify();

app.register(fastifySwagger, {
    exposeRoute: true,
    routePrefix: "/docs",
    swagger: {
        info: { title: "stripe-api" }
    },
});

app.register(stripePlugin, {
    prefix: "/stripe"
});

export default app;