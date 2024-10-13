import { PrismaClient } from '@prisma/client';
import { superValidate } from 'sveltekit-superforms/server';
import { teacherFormSchema } from '$lib/components/custom/forms/teacher-form/schema';
import type { Actions, PageServerLoad } from '../$types';
import { zod } from 'sveltekit-superforms/adapters';
import { redirect, fail } from '@sveltejs/kit';

const prisma = new PrismaClient();

import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params }) => {
    const teacherId = parseInt(params.id);

    // Fetch the teacher's details
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
                    id: true,
                }
            }
        }
    });

    // Fetch the list of departments
    const departments = await prisma.department.findMany();

    // Map the teacher's departments to an array of department IDs
    const departmentIds = teacher?.departments.map(department => department.id) || [];

    // Prepare the data for the form
    const formData = {
        firstName: teacher?.user.firstName || '',
        lastName: teacher?.user.lastName || '',
        middleName: teacher?.user.middleName || '',
        email: teacher?.user.email || '',
        employeeId: teacher?.employeeId || '',
        dateOfBirth: teacher?.user.dateOfBirth.toISOString().split('T')[0] || '',
        gender: teacher?.user.gender || '',
        contactNumber: teacher?.user.contactNumber || '',
        address: teacher?.user.address || '',
        password: teacher?.user.password || '',
        position: teacher?.position || '',
        departments: departmentIds
    };

    return { teacher: formData, departments };
};