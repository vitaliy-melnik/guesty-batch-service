module.exports = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Guesty Batch service Swagger API",
            version: "0.0.1",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["../app/v1/routes/*.js"],
};