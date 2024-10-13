import { z } from 'zod';

export const departmentFormSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	description: z.string().min(1, { message: 'Description is required' }),
});

export type DepartmentFormSchema = typeof departmentFormSchema;