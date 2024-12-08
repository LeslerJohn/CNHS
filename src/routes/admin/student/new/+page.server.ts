import { prisma } from '$lib/server/prisma'; // Assuming you have a prisma client setup
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { studentFormSchema } from '$lib/components/custom/forms/student-form/schema';
import type { RequestEvent } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	try {
        const form = await superValidate(zod(studentFormSchema));

        const sections = await prisma.section.findMany({
			select: { id: true, name: true }
		});


		return {
            form,
			sections
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
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
        const sectionID = parseInt(formData.get('sectionID')?.toString() || '0');


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
			sectionID
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
			const newStudent = await prisma.student.create({
				data: {
					id: newUser.id, // Linking teacher to user
					guardianName,
					lrn,
                    gradeLevel: yearLevel || 0,
                    sectionID,
				},
			});

			console.log(newStudent);

			// Redirect or show success message after successful creation
			throw redirect(303, `./student/${newStudent.id}`);
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
