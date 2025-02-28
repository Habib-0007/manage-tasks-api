import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { TaskService } from "../services/task.service";
import { CreateTaskDTO, UpdateTaskDTO } from "../models/task.model";

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error retrieving tasks:", error);
      res.status(500).json({ error: "Failed to retrieve tasks" });
    }
  };

  getTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const id = parseInt(req.params.id, 10);
      const task = await this.taskService.getTaskById(id);

      if (!task) {
        res.status(404).json({ error: "Task not found" });
        return;
      }

      res.status(200).json(task);
    } catch (error) {
      console.error(`Error retrieving task with ID ${req.params.id}:`, error);
      res.status(500).json({ error: "Failed to retrieve task" });
    }
  };

  createTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const taskData: CreateTaskDTO = {
        title: req.body.title,
        description: req.body.description,
      };

      const newTask = await this.taskService.createTask(taskData);
      res.status(201).json(newTask);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ error: "Failed to create task" });
    }
  };

  updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const id = parseInt(req.params.id, 10);
      const taskData: UpdateTaskDTO = {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
      };

      const updatedTask = await this.taskService.updateTask(id, taskData);

      if (!updatedTask) {
        res.status(404).json({ error: "Task not found" });
        return;
      }

      res.status(200).json(updatedTask);
    } catch (error) {
      console.error(`Error updating task with ID ${req.params.id}:`, error);
      res.status(500).json({ error: "Failed to update task" });
    }
  };

  deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const id = parseInt(req.params.id, 10);
      const isDeleted = await this.taskService.deleteTask(id);

      if (!isDeleted) {
        res.status(404).json({ error: "Task not found" });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error(`Error deleting task with ID ${req.params.id}:`, error);
      res.status(500).json({ error: "Failed to delete task" });
    }
  };
}
