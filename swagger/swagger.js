const SwaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "ZAZU Driver API",
            version: "1.0.0",
            description: "A simple Driver authorization API",
            termsOfService: "https://weblotts.com/",
            contact: {
                name: "API Support",
                url: "https://weblotts.com/",
                email: "zazu@weblotts.com"
            }

        },
        servers: [
            {
                url: "http://localhost:5100",
                description: "A simple Driver authorization API"
            }

        ]
    },
    apis: ["./routes/*.js"]
}
const specs = SwaggerJsDoc(options);

module.exports = specs;