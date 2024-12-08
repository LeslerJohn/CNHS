import { message } from 'sveltekit-superforms';
import { z } from 'zod';

export const addStudentFormSchema = z.object({
    programId: z.number().int().min(1, { message: 'Program ID is required' }),
    studentId: z.number().int().optional().nullable()
});

export type AddStudentFormSchema = typeof addStudentFormSchema;