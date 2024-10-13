import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { strandFormSchema } from '$lib/components/custom/forms/strand-form/schema';
import { fail, redirect, error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params }) => {
	const strandId = parseInt(params.id);
	const strand = await prisma.strand.findUnique({ where: { id: strandId } });

	if (!strand) {
		throw error(404, 'strand not found');
	}

	return {
		form: await superValidate({ name: strand.name ?? '', description: strand.description ?? '' }, zod(strandFormSchema))
	};
};

export const actions: Actions = {
	default: async ({request, params}) => {
		const form = await superValidate(request, zod(strandFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}
		const strandId = parseInt(params.id);

		await prisma.strand.update({ data: form.data, where: { id: strandId } });

		redirect(302, `../`);
	}
};