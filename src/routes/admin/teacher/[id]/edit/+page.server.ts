import { PrismaClient } from '@prisma/client';
import { superValidate } from 'sveltekit-superforms/server';
import { teacherFormSchema } from '$lib/components/custom/forms/teacher-form/schema';
import type { Actions, PageServerLoad } from '../$types';
import { zod } from 'sveltekit-superforms/adapters';
import { redirect, fail } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ params }) => {
    const teacherId = parseInt(params.id);

    const teacher = await prisma.teacher.findFirst({
        where: { id: teacherId },
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    middleName: true,
                    email: true,
                    dateOfBirth: true,
                    gender: true,
                    contactNumber: true,
                    address: true,
                    password: true,
                }
            },
            departments: {
                select: {
                    department: {
                        select: { id: true, name: true }
                    }
                }
            }
        }
    });

    const departments = await prisma.department.findMany({
        select: { id: true, name: true }
    });

    const departmentIds = teacher?.departments.map((dept) => dept.department.id) || [];

    const formData = {
        firstName: teacher?.user?.firstName || '',
        lastName: teacher?.user?.lastName || '',
        middleName: teacher?.user?.middleName || '',
        email: teacher?.user?.email || '',
        employeeId: teacher?.employeeId || '',
        dateOfBirth: teacher?.user?.dateOfBirth?.toISOString().split('T')[0] || '',
        gender: teacher?.user?.gender || '',
        contactNumber: teacher?.user?.contactNumber || '',
        address: teacher?.user?.address || '',
        password: teacher?.user?.password || '',
        position: teacher?.position || '',
        departments: departmentIds,
        isActive: teacher?.isActive || false
    };

    const form = await superValidate(formData, zod(teacherFormSchema));

    console.log(departments)
    return { data: form, departments };
};


export const actions: Actions = {
    default: async ({ request, params }) => {
        // Validate form data with the teacherFormSchema
        const form = await superValidate(request, zod(teacherFormSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const teacherId = parseInt(params.id);

        try {
            await prisma.teacher.update({
                data: {
                    isActive: form.data.isActive,
                    employeeId: form.data.employeeId,
                    position: form.data.position,
                    user: {
                        update: {
                            firstName: form.data.firstName,
                            lastName: form.data.lastName,
                            middleName: form.data.middleName,
                            email: form.data.email,
                            dateOfBirth: new Date(form.data.dateOfBirth),
                            gender: form.data.gender,
                            contactNumber: form.data.contactNumber,
                            address: form.data.address,
                            password: form.data.password,
                        }
                    }
                },
                where: { id: teacherId }
            });
        } catch (error) {
            console.error("Error updating teacher:", error);
            return fail(500, { message: 'Failed to update teacher', form });
        }
        throw redirect(302, '../');
    }
};
