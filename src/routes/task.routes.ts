import { Router } from "express";
import { body } from "express-validator";
import {
  createTask,
  updateTask,
  getAllTasks,
  deleteTask,
} from "../controllers/task.controller";

const router = Router();

router.post(
  "/",
  [
    body("title").isString().notEmpty().withMessage("Title is required"),
    body("description")
      .isString()
      .notEmpty()
      .withMessage("Description is required"),
  ],
  createTask
);

router.get("/", getAllTasks);
router.put(
  "/:id",
  [
    body("title").optional().isString().withMessage("Title must be a string"),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string"),
  ],
  updateTask
);

router.delete("/:id", deleteTask);

export default router;
