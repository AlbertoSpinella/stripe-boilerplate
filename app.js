import Fastify from "fastify";
import fastifySwagger from "fastify-swagger";
import { stripePlugin } from "./routes/stripe/plugin.js";

const app = Fastify();

import rawBody from "fastify-raw-body";

app.register(rawBody, {
    field: 'rawBody', // change the default request.rawBody property name
    global: false, // add the rawBody to every request. **Default true**
    encoding: 'utf8', // set it to false to set rawBody as a Buffer **Default utf8**
    runFirst: true // get the body before any preParsing hook change/uncompress it. **Default false**
});

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