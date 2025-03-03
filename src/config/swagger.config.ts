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
        url: "http://localhost:3000/api",
        description: "Development server",
      },
      {
        url: "https://manage-tasks-api-ten.vercel.app/api",
        description: "Production server",
      },
    ],
    tags: [
      {
        name: "Tasks",
        description: "Task management endpoints",
      },
    ],
    components: {
      schemas: {
        Task: {
          type: "object",
          properties: {
            id: { type: "integer", description: "Task ID" },
            title: { type: "string", description: "Task title" },
            description: {
              type: "string",
              nullable: true,
              description: "Task description",
            },
            completed: {
              type: "boolean",
              description: "Task completion status",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
          },
        },
        CreateTaskInput: {
          type: "object",
          required: ["title"],
          properties: {
            title: {
              type: "string",
              description: "Task title",
              minLength: 3,
              maxLength: 100,
            },
            description: {
              type: "string",
              description: "Task description",
              nullable: true,
            },
          },
        },
        UpdateTaskInput: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Task title",
              minLength: 3,
              maxLength: 100,
            },
            description: {
              type: "string",
              description: "Task description",
              nullable: true,
            },
            completed: {
              type: "boolean",
              description: "Task completion status",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: { type: "string" },
            message: { type: "string" },
          },
        },
        ValidationError: {
          type: "object",
          properties: {
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  value: { type: "string" },
                  msg: { type: "string" },
                  param: { type: "string" },
                  location: { type: "string" },
                },
              },
            },
          },
        },
      },
      responses: {
        TaskListResponse: {
          description: "A list of tasks",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Task",
                },
              },
            },
          },
        },
        TaskResponse: {
          description: "Task details",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Task",
              },
            },
          },
        },
        NotFound: {
          description: "Task not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        ValidationError: {
          description: "Invalid input",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ValidationError",
              },
            },
          },
        },
        ServerError: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.routes.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };
