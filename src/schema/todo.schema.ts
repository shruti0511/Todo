import { z } from "zod";

export const todoSchema = z.object({
    title: z.string(),
    description: z.string(),
    dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in yyyy-mm-dd format')
        .refine((val) => new Date(val) >= new Date(), {
            message: 'Date must not be in the past',
        })
})

export const updateTodoSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in yyyy-mm-dd format')
        .refine((val) => new Date(val) >= new Date(), {
            message: 'Date must not be in the past',
        }).optional(),
    completed: z.boolean().optional()
})

export type todoBody = z.infer<typeof todoSchema>
export type updateTodoBody = z.infer<typeof updateTodoSchema>