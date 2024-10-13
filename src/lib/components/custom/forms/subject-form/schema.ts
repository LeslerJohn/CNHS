import { z } from 'zod';

export const subjectFormSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	description: z.string().min(1, { message: 'Description is required' }),
    yearLevel: z.number().min(7).max(12, { message: "Year level must be between 7 and 12" }).optional(),
});

export type SubjectFormSchema = typeof subjectFormSchema;