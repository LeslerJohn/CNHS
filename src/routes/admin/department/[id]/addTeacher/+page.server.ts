import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { prisma } from '$lib/server/prisma';
import { addTeacherFormSchema } from '$lib/components/custom/forms/add-teacher-form/schema';
import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    const departmentId = parseInt(params.id, 10);

    const teachers = await prisma.teacher.findMany({
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

    const section = await prisma.department.findUnique({
        where: { id: departmentId },
        select: {
            id: true,
            name: true
        }
    });

    const formData = {
        departmentId: departmentId,
        teachers: teachers.map((teacher) => teacher.id)
    }

    const form = await superValidate(formData, zod(addTeacherFormSchema));

    console.log(form)

    return {
        form,
        teachers: teachers.map((teacher) => ({
            value: teacher.id,
            label: `${teacher.user?.firstName ?? ''} ${teacher.user?.lastName ?? ''}`
        })),
        section
    };
};

export const actions: Actions = {
    default: async ({ request, params }) => {
        const departmentId = parseInt(params.id, 10);

        const formData = await request.formData();
        const teacherId = parseInt(formData.get('teacherId') as string, 10);

        try {
            const existingteacher = await prisma.teacherOnDepartments.findFirst({
                where: {
                    departmentId: departmentId,
                    teacherId: teacherId,
                },
            });

            if (existingteacher) {
                return {
                    success: false,
                    message: 'This teacher is already assigned to the section.',
                };
            }

            await prisma.teacherOnDepartments.create({
                data: {
                    departmentId: departmentId,
                    teacherId: teacherId,
                },
            });

        } catch (error) {
            console.error('Error inserting data:', error);
            return {
                success: false,
                message: 'Failed to assign teacher. Please try again.',
            };
        }
        throw redirect(302, './');
    },
};