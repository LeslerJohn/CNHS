import { z } from 'zod';

export const addGradeFormSchema = z.object({
    studentId: z.number().int().min(1, { message: "Student ID must be a positive integer" }),
    subjectId: z.number().int().min(1, { message: "Subject ID must be a positive integer" }),
    grade: z.number().int().min(0, { message: "Grade must be at least 0" }).max(100, { message: "Grade must be at most 100" }),
    remarks: z.string().optional().nullable()
});

export type AddGradeFormSchema = typeof addGradeFormSchema;
