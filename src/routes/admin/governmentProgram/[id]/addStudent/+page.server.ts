import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { prisma } from '$lib/server/prisma';
import { addStudentFormSchema } from '$lib/components/custom/forms/add-student-form/schema';
import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    const programId = parseInt(params.id, 10);

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

    const program = await prisma.governmentProgram.findUnique({
        where: { id: programId },
        select: {
            id: true,
            name: true
        }
    });

    const formData = {
        programId: programId,
        students: students.map((student) => student.id)
    }

    const form = await superValidate(formData, zod(addStudentFormSchema));

    console.log(form)

    return {
        form,
        students: students.map((student) => ({
            value: student.id,
            label: `${student.user?.firstName ?? ''} ${student.user?.lastName ?? ''}`
        })),
        program
    };
};

export const actions: Actions = {
    default: async ({ request, params }) => {
        const programId = parseInt(params.id, 10);

        const formData = await request.formData();
        const studentId = parseInt(formData.get('studentId') as string, 10);

        try {
            const existingstudent = await prisma.studentOnPrograms.findFirst({
                where: {
                    programId: programId,
                    studentId: studentId,
                },
            });

            if (existingstudent) {
                return {
                    success: false,
                    message: 'This student is already assigned to the program.',
                };
            }

            await prisma.studentOnPrograms.create({
                data: {
                    programId: programId,
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
        throw redirect(302, './');
    },
};