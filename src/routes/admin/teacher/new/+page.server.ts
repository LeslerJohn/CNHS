import { PrismaClient } from '@prisma/client';
import { superValidate } from 'sveltekit-superforms/server';
import { teacherFormSchema } from '$lib/components/custom/forms/teacher-form/schema';
import type { Actions } from '../$types';
import { zod } from 'sveltekit-superforms/adapters';
import { redirect, fail } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const load = async () => {
	const departments = await prisma.department.findMany(); // Fetch departments

	const form = await superValidate(zod(teacherFormSchema));

	return {
		form,
		departments
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const firstName = formData.get('firstName')?.toString() || '';
		const lastName = formData.get('lastName')?.toString() || '';
		const middleName = formData.get('middleName')?.toString() || '';
		const email = formData.get('email')?.toString() || '';
		const employeeId = formData.get('employeeId')?.toString() || '';
		const gender = formData.get('gender')?.toString() || '';
		const address = formData.get('address')?.toString() || '';
		const contactNumber = formData.get('contactNumber')?.toString() || '';
		const password = formData.get('password')?.toString() || '';
		const position = formData.get('position')?.toString() || '';
		const dateOfBirth = formData.get('dateOfBirth')?.toString() || '';
		const departmentsString = formData.get('departments')?.toString() || '[]';

		console.log('Departments String:', departmentsString);
		console.log('Date Of Birth:', dateOfBirth);

		// Parse departments from comma-separated string to an array of numbers
		let departments: number[] = [];
		if (departmentsString) {
			departments = departmentsString.split(',').map(id => Number(id.trim())).filter(id => !isNaN(id));
		}

		console.log('Date of Birth:', dateOfBirth);
		// Validate form data using your schema
		const validation = teacherFormSchema.safeParse({ 
			firstName,
			lastName,
			middleName,
			email,
			employeeId,
			dateOfBirth,
			gender,
			contactNumber,
			address,
			password,
			position,
			departments 
		});

		console.log(validation);

		if (!validation.success) {
			const errors = validation.error.flatten().fieldErrors;
			return { 
				status: 400, 
				errors 
			};
		}

		try {
			const newUser = await prisma.user.create({
				data: {
					firstName,
					lastName,
					middleName: middleName || null, // Optional field
					email,
					dateOfBirth: new Date(dateOfBirth), // Ensure this is a Date object
					gender,
					contactNumber,
					address,
					password, // Use hashedPassword instead in a real app
					isAdmin: false, // Assuming this is for non-admin user creation
				},
			});

			console.log(newUser);

			// Create the teacher associated with the new user
			const newTeacher = await prisma.teacher.create({
				data: {
					id: newUser.id, // Linking teacher to user
					position: position || null,
					employeeId,
				},
			});

			// Now create entries in the TeacherOnDepartments table for each department
			const departmentIds = departments.map(departmentId => ({
				teacherId: newTeacher.id,
				departmentId,
			}));

			// Use Promise.all to create multiple records
			await Promise.all(
				departmentIds.map(department => 
					prisma.teacherOnDepartments.create({
						data: department,
					})
				)
			);

			console.log(newTeacher);

			// Redirect or show success message after successful creation
			throw redirect(303, `/teachers/${newTeacher.id}`);
		} catch (error) {
			console.error('Error creating teacher:', error);
			// Return a 500 error if something goes wrong
			return fail(500, {
				formData,
				error: 'Failed to create a new teacher. Please try again later.',
			});
		}
	},
};
