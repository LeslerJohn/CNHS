import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { superValidate, type SuperValidated } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { subjectFormSchema } from '$lib/components/custom/forms/subject-form/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod(subjectFormSchema)) };
}

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const name = formData.get('name')?.toString() || '';
        const description = formData.get('description')?.toString() || '';
        const gradeLevel = Number(formData.get('gradeLevel')) ?? 0;

        const validation = subjectFormSchema.safeParse({ name, description, gradeLevel });

        if (!validation.success) {
            const errors = validation.error.flatten().fieldErrors;
            return { 
                status: 400, 
                errors 
            };
        }

        try {
            const subject = await prisma.subject.create({
                data: {
                    name,
                    description,
                    gradeLevel,
                }
            });
        } catch (err) {
            console.error(err);
            return {
                status: 500,
                errors: { message: 'Error creating subject' }
            };
        }
        throw redirect(302, `../`);
    }
};
