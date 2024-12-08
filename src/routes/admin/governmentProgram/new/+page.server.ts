import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { superValidate, type SuperValidated } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { programFormSchema } from '$lib/components/custom/forms/program-form/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod(programFormSchema)) };
}

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const name = formData.get('name')?.toString() || '';
        const description = formData.get('description')?.toString() || '';

        // Validate form data using your schema
        const validation = programFormSchema.safeParse({ name, description });

        if (!validation.success) {
            const errors = validation.error.flatten().fieldErrors;
            return { 
                status: 400, 
                errors 
            };
        }

        try {
            // Create a new department in the database
            const program = await prisma.governmentProgram.create({
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
