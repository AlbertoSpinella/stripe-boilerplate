import {
    getIndex,
    postIndex
} from "./controller.js";

export const getIndexOpts = {
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    result: { type: "string" }
                },
                required: ["result"],
                additionalProperties: false
            }
        }
    },
    handler: getIndex
};

export const postIndexOpts = {
    schema: {
        body: {
            type: "object",
            required: ["name"],
            properties: {
                name: { type: "string" }
            },
            additionalProperties: false
        },
        response: {
            200: {
                type: "object",
                properties: {
                    result: { type: "string" }
                },
                required: ["result"],
                additionalProperties: false
            }
        }
    },
    handler: postIndex
};