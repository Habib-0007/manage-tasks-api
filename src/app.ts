import express, { Application } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";
import { TaskController } from "./controllers/task.controller";
import {
  createTaskValidation,
  updateTaskValidation,
  getTaskValidation,
  deleteTaskValidation,
} from "./validation/task.validation";
// import fs from "fs";
import path from "path";

export function createApp(): Application {
  const app: Application = express();
  const taskController = new TaskController();

  app.use(cors({ origin: "*" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("node_modules/swagger-ui-dist"));

  // let swaggerFile = `${process.cwd()}/swagger.json`;

  // let swaggerData = fs.readFileSync(swaggerFile, "utf8");

  // let swaggerJSON = JSON.parse(swaggerData);
  app.use(
    "/api-docs",
    express.static(path.join(__dirname, "node_modules/swagger-ui-dist"))
  );

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      customCssUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
    })
  );

  app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Task Management API" });
  });

  app.get("/api/tasks", taskController.getAllTasks);
  app.get("/api/tasks/:id", getTaskValidation, taskController.getTaskById);
  app.post("/api/tasks", createTaskValidation, taskController.createTask);
  app.put("/api/tasks/:id", updateTaskValidation, taskController.updateTask);
  app.delete("/api/tasks/:id", deleteTaskValidation, taskController.deleteTask);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
