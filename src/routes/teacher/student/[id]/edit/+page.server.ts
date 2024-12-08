import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { studentFormSchema } from '$lib/components/custom/forms/student-form/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { redirect, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';

export const load: PageServerLoad = async ({ params }) => {
    const studentId = parseInt(params.id);

    const student = await prisma.student.findUnique({
        where: { id: studentId },
        include: {
            sections: true,
            user: true
        },
    });

    console.log(student);

    if (!student) {
        return {
            status: 404,
            error: 'Student not found'
        };
    }

    const studentData = {
        firstName: student?.user?.firstName || '',
        lastName: student?.user?.lastName || '',
        middleName: student?.user?.middleName || '',
        email: student?.user?.email || '',
        lrn: student?.lrn || '',
        dateOfBirth: student?.user?.dateOfBirth?.toISOString().split('T')[0] || '',
        gender: student?.user?.gender || '',
        contactNumber: student?.user?.contactNumber || '',
        address: student?.user?.address || '',
        password: student?.user?.password || '',
        guardianName: student?.guardianName || '',
        yearLevel: student?.gradeLevel || 7,
    };

    const form = await superValidate(studentData, zod(studentFormSchema));

    if (!form.valid) {
        console.log(form);
        return {
            status: 500,
            error: 'Student data validation failed'
        };
    }

    console.log(form);

    return {
        data: form, 
    };
};

export const actions: Actions = {
    default: async ({ request, params }) => {
        const studentId = parseInt(params.id);

        const form = await superValidate(request, zod(studentFormSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        try {
            await prisma.student.update({
                data: {
                    lrn: form.data.lrn,
                    gradeLevel: form.data.yearLevel,
                    guardianName: form.data.guardianName,
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
                where: { id: studentId }
            });
        } catch (error) {
            console.error("Error updating teacher:", error);
            return fail(500, { message: 'Failed to update teacher', form });
        }
        throw redirect(302, '../');
    }
};
