import { prisma } from '$lib/server/prisma'; // Assuming you have a prisma client setup
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { studentFormSchema } from '$lib/components/custom/forms/student-form/schema';
import type { RequestEvent } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	const form = await superValidate(zod(studentFormSchema));

	return {
		form,
	};
};


export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const firstName = formData.get('firstName')?.toString() || '';
		const lastName = formData.get('lastName')?.toString() || '';
		const middleName = formData.get('middleName')?.toString() || '';
		const email = formData.get('email')?.toString() || '';
		const lrn = formData.get('lrn')?.toString() || '';
		const gender = formData.get('gender')?.toString() || '';
		const address = formData.get('address')?.toString() || '';
		const contactNumber = formData.get('contactNumber')?.toString() || '';
		const password = formData.get('password')?.toString() || '';
		const guardianName = formData.get('guardianName')?.toString() || '';
		const dateOfBirth = formData.get('dateOfBirth')?.toString() || '';
        const yearLevel = parseInt(formData.get('yearLevel')?.toString() || '0');


		console.log('Date Of Birth:', dateOfBirth);

        
		const validation = studentFormSchema.safeParse({ 
			firstName,
			lastName,
			middleName,
			email,
			lrn,
			dateOfBirth,
			gender,
			contactNumber,
			address,
			password,
			guardianName,
			yearLevel,
		});

		console.log(validation);

		if (!validation.success) {
			const errors = validation.error.flatten().fieldErrors;
			return { 
				status: 400, 
				errors 
			};
		}

		let newStudentId;

		try {
			const newUser = await prisma.user.create({
				data: {
					firstName,
					lastName,
					middleName: middleName || null,
					email,
					dateOfBirth: new Date(dateOfBirth),
					gender,
					contactNumber,
					address,
					password,
					isAdmin: false,
				},
			});

			console.log(newUser);

			// Create the teacher associated with the new user
			const newStudent = await prisma.student.create({
				data: {
					id: newUser.id, // Linking teacher to user
					guardianName,
					lrn,
                    gradeLevel: yearLevel || 0,
				},
			});

			newStudentId = newStudent.id;

		} catch (error) {
			console.error('Error creating teacher:', error);
			// Return a 500 error if something goes wrong
			return fail(500, {
				formData,
				error: 'Failed to create a new teacher. Please try again later.',
			});
		}
		throw redirect(303, `./student/${newStudentId}`);
	},
};
