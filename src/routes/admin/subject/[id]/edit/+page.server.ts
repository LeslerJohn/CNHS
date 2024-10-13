import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { subjectFormSchema } from '$lib/components/custom/forms/subject-form/schema';
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params }) => {
	// Fetch the subject using the subjectId from params
	const subjectId = parseInt(params.id);
	const subject = await prisma.subject.findUnique({ where: { id: subjectId } });

	// Handle case where subject is not found
	if (!subject) {
		throw redirect(302, '/404'); // Redirect or show error page if the subject is not found
	}

	

	return {
		form: await superValidate(
			{
				name: subject.name ?? '',
				description: subject.description ?? '',
				yearLevel: subject.gradeLevel ?? 0 // Ensure the key matches the schema
			},
			zod(subjectFormSchema)
		)
	};
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		// Validate form data
		const form = await superValidate(request, zod(subjectFormSchema));

		if (!form.valid) {
			// Return form with errors
			return fail(400, { form });
		}

		const subjectId = parseInt(params.id); // Get the subject ID from params

		// Update the subject in the database
		try {
			await prisma.subject.update({
				data: form.data,
				where: { id: subjectId }
			});
		} catch (error) {
			// Handle error during the update
			return fail(500, { message: 'Failed to update subject', form });
		}

		// Return redirect after successful update
		throw redirect(302, `../`);
	}
};
