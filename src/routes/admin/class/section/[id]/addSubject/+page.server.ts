import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { prisma } from '$lib/server/prisma';
import { addSubjectFormSchema } from '$lib/components/custom/forms/add-subject-form/schema';
import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    const sectionId = parseInt(params.id, 10);

    const subjects = await prisma.subject.findMany({
        select: {
            id: true,
            name: true
        }
    });

    const section = await prisma.section.findUnique({
        where: { id: sectionId },
        select: {
            id: true,
            name: true
        }
    });

    const formData = {
        sectionId: sectionId,
        subjects: subjects.map((subject) => subject.id)
    }

    const form = await superValidate(formData, zod(addSubjectFormSchema));

    console.log(form)

    return {
        form,
        subjects: subjects.map((subject) => ({
            value: subject.id,
            label: subject.name
        })),
        section
    };
};

export const actions: Actions = {
    default: async ({ request, params }) => {
        const sectionId = parseInt(params.id, 10);

        const formData = await request.formData();
        const subjectId = parseInt(formData.get('subjectId') as string, 10);

        try {
            const existingSubject = await prisma.subjectonSections.findFirst({
                where: {
                    sectionId: sectionId,
                    subjectId: subjectId,
                },
            });

            if (existingSubject) {
                return {
                    success: false,
                    message: 'This subject is already assigned to the section.',
                };
            }

            await prisma.subjectonSections.create({
                data: {
                    sectionId: sectionId,
                    subjectId: subjectId,
                },
            });

        } catch (error) {
            console.error('Error inserting data:', error);
            return {
                success: false,
                message: 'Failed to assign subject. Please try again.',
            };
        }
        throw redirect(302, './');
    },
};