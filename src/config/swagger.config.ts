import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      description: "API for managing tasks",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
      {
        url: "https://manage-tasks-api-ten.vercel.app",
        description: "Production server",
      },
    ],
    tags: [
      {
        name: "Tasks",
        description: "Task management endpoints",
      },
    ],
  },
  apis: ["./src/routes/*.routes.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };
