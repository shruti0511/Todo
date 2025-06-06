import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});


export type UserBody = z.infer<typeof userSchema>;