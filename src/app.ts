import express, { Application } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
// import * as swaggerDocument from "../swagger.json";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";
import { TaskController } from "./controllers/task.controller";
import {
  createTaskValidation,
  updateTaskValidation,
  getTaskValidation,
  deleteTaskValidation,
} from "./validation/task.validation";
import fs from "fs";

export function createApp(): Application {
  const app: Application = express();
  const taskController = new TaskController();

  app.use(cors({ origin: "*" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

    let swaggerFile: string = `${process.cwd()}/swagger.json`;

    let swaggerData: string = fs.readFileSync(swaggerFile, 'utf8');

    let swaggerJSON = JSON.parse(swaggerData);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSON, null, null, null));

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
