import { PrismaClient } from "@prisma/client";
import { CreateTaskDTO, TaskDTO, UpdateTaskDTO } from "../models/task.model";

const prisma = new PrismaClient();

export class TaskService {
  async getAllTasks() {
    return await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getTaskById(id: number) {
    return await prisma.task.findUnique({
      where: { id },
    });
  }

  async createTask(taskData: CreateTaskDTO) {
    return await prisma.task.create({
      data: taskData,
    });
  }

  async updateTask(id: number, taskData: UpdateTaskDTO) {
    // Check if task exists
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return null;
    }

    return await prisma.task.update({
      where: { id },
      data: taskData,
    });
  }

  async deleteTask(id: number): Promise<boolean> {
    // Check if task exists
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return false;
    }

    await prisma.task.delete({
      where: { id },
    });

    return true;
  }
}
