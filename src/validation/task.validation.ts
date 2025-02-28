import { body, param } from "express-validator";

export const createTaskValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];

export const updateTaskValidation = [
  param("id").isInt().withMessage("Task ID must be an integer"),
  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed status must be a boolean"),
];

export const getTaskValidation = [
  param("id").isInt().withMessage("Task ID must be an integer"),
];

export const deleteTaskValidation = [
  param("id").isInt().withMessage("Task ID must be an integer"),
];
