import type { Actions, PageServerLoad } from './$types';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { departmentFormSchema } from '$lib/components/custom/forms/department-form/schema';
import { fail, redirect, error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params }) => {
	const departmentId = parseInt(params.id);
	const department = await prisma.department.findUnique({ where: { id: departmentId } });

	if (!department) {
		throw error(404, 'Department not found');
	}

	return {
		form: await superValidate({ name: department.name ?? '', description: department.description ?? '' }, zod(departmentFormSchema))
	};
};

export const actions: Actions = {
	default: async ({request, params}) => {
		const form = await superValidate(request, zod(departmentFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}
		const departmentId = parseInt(params.id);

		await prisma.department.update({ data: form.data, where: { id: departmentId } });

		redirect(302, `../`);
	}
};