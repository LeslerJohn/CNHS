import { z } from 'zod';

export const studentFormSchema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	middleName: z.string().optional(),
	email: z.string().email('Invalid email address'),
	dateOfBirth: z.string(),
	gender: z.string().min(1, 'Gender is required'),
	contactNumber: z.string().min(1, 'Contact number is required'),
	address: z.string().min(1, 'Address is required'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
	departments: z.array(z.number()).optional(),
	guardianName: z.string().min(1, 'Guardian name is required'),
	lrn: z.string().min(1, 'LRN is required'),
	yearLevel: z.number().int().min(1, 'Year level is required')
});

export type StudentFormSchema = typeof studentFormSchema;
