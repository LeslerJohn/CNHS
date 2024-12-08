import { z } from 'zod';

export const addScheduleFormSchema = z.object({
    subjectOnSectionId: z.number().int().min(1, { message: 'Department ID is required' }),
    teacherId: z.number().int().optional().nullable(),
    dayOfWeek: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: 'You have to select at least one day.'
    }),
    startTime: z.string().nonempty({ message: 'Start time is required' }),
    endTime: z.string().nonempty({ message: 'End time is required' })
});

export type AddScheduleFormSchema = typeof addScheduleFormSchema;
