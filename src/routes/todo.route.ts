import express from "express";
import { isAuthenticated } from "../middleware/authValidation";
import { validate } from "../middleware/validationMiddleware";
import { todoSchema, updateTodoSchema } from "../schema/todo.schema";
import { addTodo, getTodos, getTodoById, deleteTodo, updateTodo } from "../controllers/todo.controller";

const router = express.Router()

router.get('/', isAuthenticated, getTodos)
router.get('/:id', isAuthenticated, getTodoById)
router.post('/', isAuthenticated, validate(todoSchema), addTodo)
router.put('/:id', isAuthenticated, validate(updateTodoSchema), updateTodo)
router.delete('/:id', isAuthenticated, deleteTodo)

export default router