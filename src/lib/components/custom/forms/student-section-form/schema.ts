import { message } from 'sveltekit-superforms';
import { z } from 'zod';

export const studentToSectionFormSchema = z.object({
    sectionId: z.number().int().min(1, { message: 'Section ID is required' }),
    studentId: z.number().int().optional().nullable()
});

export type StudentToSectionFormSchema = typeof studentToSectionFormSchema;