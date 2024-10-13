import { z } from 'zod';

export const sectionFormSchema = z.object({
	name: z.string().min(1, { message: 'Section name is required' }),
    yearLevel: z.number().min(7).max(12, { message: "Year level must be between 7 and 12" }),
	roomID: z.number().int().nullable().optional(),
	strandID: z.number().int().nullable().optional(),
	adviserID: z.number().int().nullable().optional()
});

export type SectionFormSchema = typeof sectionFormSchema;
