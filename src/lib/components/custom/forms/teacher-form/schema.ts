import { z } from 'zod';

// Define the teacher form schema
export const teacherFormSchema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	middleName: z.string().optional(),
	email: z.string().email('Invalid email address'),
	employeeId: z.string().min(1, 'Employee ID is required'),
	dateOfBirth: z.string(),
	gender: z.string().min(1, 'Gender is required'),
	contactNumber: z.string().min(1, 'Contact number is required'),
	address: z.string().min(1, 'Address is required'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
	position: z.string().optional(),
	departments: z.array(z.number()).optional(),
	isActive: z.boolean()
});


export type TeacherFormSchema = typeof teacherFormSchema;
