import { z } from 'zod';

export const sectionFormSchema = z.object({
	name: z.string().min(1, { message: 'Section name is required' }),
    yearLevel: z.number().min(7).max(12, { message: "Year level must be between 7 and 12" }),
	startSchoolYear: z.number().int(),
	roomID: z.number().int().nullable(),
	adviserID: z.number().int().nullable(),
	isActive: z.boolean()
});

export type SectionFormSchema = typeof sectionFormSchema;
