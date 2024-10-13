import type { Actions, PageServerLoad } from './$types';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { programFormSchema } from '$lib/components/custom/forms/program-form/schema';
import { fail, redirect, error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params }) => {
	const programId = parseInt(params.id);
	const program  = await prisma.governmentProgram.findUnique({ where: { id: programId}});

	if (!program) {
		throw error(404, 'Program not found');
	}

	return {
		form: await superValidate({ name: program.name ?? '', description: program.description ?? '' }, zod(programFormSchema))
	};
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const form = await superValidate(request, zod(programFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}
		const programId = parseInt(params.id);

		await prisma.governmentProgram.update({ data: form.data, where: { id: programId } });

		redirect(302, `../`);
	}
};