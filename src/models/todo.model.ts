import mongoose, { Schema, Types } from 'mongoose'

export interface ITodo {
    title: string,
    description: string,
    dueDate: Date,
    completed: boolean,
    user: Types.ObjectId
}

const todoSchema = new Schema<ITodo>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Todo = mongoose.model<ITodo>('Todo', todoSchema)
export default Todo;