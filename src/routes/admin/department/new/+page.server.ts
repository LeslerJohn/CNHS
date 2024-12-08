import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { superValidate, type SuperValidated } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { departmentFormSchema } from '$lib/components/custom/forms/department-form/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod(departmentFormSchema)) };
}

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const name = formData.get('name')?.toString() || '';
        const description = formData.get('description')?.toString() || '';

        const validation = departmentFormSchema.safeParse({ name, description });

        if (!validation.success) {
            const errors = validation.error.flatten().fieldErrors;
            return { 
                status: 400, 
                errors 
            };
        }

        try {
            await prisma.department.create({
                data: {
                    name,
                    description,
                }
            });
        } catch (err) {
            console.error(err);
            return {
                status: 500,
                errors: { message: 'Error creating department' }
            };
        }

        throw redirect(302, `./`);
    }
};
