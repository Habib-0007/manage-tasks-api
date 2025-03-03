import express, { Application } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";
import { TaskController } from "./controllers/task.controller";
import {
  createTaskValidation,
  updateTaskValidation,
  getTaskValidation,
  deleteTaskValidation,
} from "./validation/task.validation";
import path from "path";
import fs from "fs";
import swaggerDocs from "../swagger.json";

export function createApp(): Application {
  const app: Application = express();
  const taskController = new TaskController();

  app.use(cors({ origin: "*" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(express.static(path.join(__dirname, "../public")));

  // const swaggerPath = path.resolve(__dirname, "../swagger.json");
  // const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, "utf8"));

  const options = {
    swaggerOptions: {
      url: "/swagger.json",
    },
  };

 /* app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, options)
  );
*/

app.use(
    '/api-docs', 
    express.static('node_modules/swagger-ui-dist/', {index: false}),
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocs)
);

app.use('/api-docs', express.static(path.join(__dirname, 'node_modules/swagger-ui-dist')));
app.use('/api-docs/swagger-ui.css', express.static(path.join(__dirname, 'node_modules/swagger-ui-dist/swagger-ui.css')));
app.use('/api-docs/swagger-ui-bundle.js', express.static(path.join(__dirname, 'node_modules/swagger-ui-dist/swagger-ui-bundle.js')));
app.use('/api-docs/swagger-ui-standalone-preset.js', express.static(path.join(__dirname, 'node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js')));
app.use('/api-docs/swagger-ui-init.js', express.static(path.join(__dirname, 'node_modules/swagger-ui-dist/swagger-ui-init.js')));

  app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Task Management API" });
  });

  app.get("/api/tasks", taskController.getAllTasks);
  app.get("/api/tasks/:id", getTaskValidation, taskController.getTaskById);
  app.post("/api/tasks", createTaskValidation, taskController.createTask);
  app.put("/api/tasks/:id", updateTaskValidation, taskController.updateTask);
  app.delete("/api/tasks/:id", deleteTaskValidation, taskController.deleteTask);

  // Error handlers
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
