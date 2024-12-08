import { message } from 'sveltekit-superforms';
import { z } from 'zod';

export const addTeacherFormSchema = z.object({
    departmentId: z.number().int().min(1, { message: 'Department ID is required' }),
    teacherId: z.number().int().optional().nullable()
});

export type AddTeacherFormSchema = typeof addTeacherFormSchema;