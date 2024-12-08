import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { prisma } from '$lib/server/prisma';
import { studentToSectionFormSchema } from '$lib/components/custom/forms/student-section-form/schema';
import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    const sectionId = parseInt(params.id, 10);

    const students = await prisma.student.findMany({
        select: {
            id: true,
            user: {
                select: {
                    firstName: true,
                    lastName: true
                }
            }
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
        students: students.map((student) => student.id)
    }

    const form = await superValidate(formData, zod(studentToSectionFormSchema));

    console.log(form)

    return {
        form,
        students: students.map((student) => ({
            value: student.id,
            label: `${student.user?.firstName ?? ''} ${student.user?.lastName ?? ''}`
        })),
        section
    };
};

export const actions: Actions = {
    default: async ({ request, params }) => {
        const sectionId = parseInt(params.id, 10);

        const formData = await request.formData();
        const studentId = parseInt(formData.get('studentId') as string, 10);

        try {
            const existingstudent = await prisma.studentOnSections.findFirst({
                where: {
                    sectionId: sectionId,
                    studentId: studentId,
                },
            });

            if (existingstudent) {
                return {
                    success: false,
                    message: 'This student is already assigned to the section.',
                };
            }

            await prisma.studentOnSections.create({
                data: {
                    sectionId: sectionId,
                    studentId: studentId,
                },
            });

        } catch (error) {
            console.error('Error inserting data:', error);
            return {
                success: false,
                message: 'Failed to assign student. Please try again.',
            };
        }
        throw redirect(302, './students');
    },
};