import { message } from 'sveltekit-superforms';
import { z } from 'zod';

export const addSubjectFormSchema = z.object({
    sectionId: z.number().int().min(1, { message: 'Section ID is required' }),
    subjectId: z.number().int().optional().nullable()
});

export type AddSubjectFormSchema = typeof addSubjectFormSchema;