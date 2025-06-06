import { Request, Response } from "express";
import Todo, { ITodo } from "../models/todo.model";
import { todoBody, updateTodoBody } from "../schema/todo.schema";
import { errorResponse, successResponse } from "../utils/response";


//get all todos by user id
export const getTodos = async (req: Request, res: Response): Promise<any> => {
    const todoList = await Todo.find({ user: req.user?.id }).exec()
    if (todoList.length == 0) {
        return res.status(200).json(successResponse<ITodo[]>("No todos found", []))
    }
    return res.status(200).json(successResponse<ITodo[]>("Todos find successfully", todoList))
}

//get todo by id
export const getTodoById = async (req: Request<{ id: string }>, res: Response): Promise<any> => {
    const { id } = req.params
    const todo = await Todo.findById(id).exec()
    if (!todo) {
        return res.status(404).json(errorResponse("Todo Not Found"));
    }
    return res.status(200).json(successResponse<ITodo>("Todo find successfully", todo))
}

//add todo
export const addTodo = async (req: Request<any, any, todoBody>, res: Response): Promise<any> => {
    const { title, description, dueDate } = req.body
    const todo = new Todo({
        title: title,
        description: description,
        dueDate: dueDate,
        user: req.user!.id
    })
    await todo.save()
    return res.status(200).json(successResponse("Todo Added successfully", todo))
}

//update todo
export const updateTodo = async (req: Request<{ id: string }, any, updateTodoBody>, res: Response): Promise<any> => {
    const { id } = req.params;

    const updates = Object.fromEntries(
        Object.entries(req.body).filter(([_, value]) => value !== undefined)
    );

    const todo = await Todo.findOneAndUpdate(
        { _id: id, user: req.user?.id },
        { $set: updates },
        { new: true }
    ).exec();

    if (!todo) {
        return res.status(404).json(errorResponse("Todo not found"));
    }
    return res.status(200).json(successResponse<ITodo>("Todo updated successfully", todo));
}

//delete todo
export const deleteTodo = async (req: Request<{ id: string }>, res: Response): Promise<any> => {
    const { id } = req.params
    const todo = await Todo.findByIdAndDelete(id).exec()
    if (!todo) {
        return res.status(404).json(errorResponse("Todo Not Available"));
    }
    return res.status(200).json(successResponse<ITodo>("Todo deleted successfully", todo))
}
