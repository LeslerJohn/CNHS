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
            section: true,
            user: true
        },
    });

    const sections = await prisma.section.findMany({
        select: { id: true, name: true }
    });

    if (!student) {
        return {
            status: 404,
            error: new Error('Student not found')
        };
    }

    const studentData = {
        firstName: student.user.firstName || '',
        lastName: student.user.lastName || '',
        middleName: student.user.middleName || '', // Include middleName if applicable
        email: student.user.email || '',
        lrn: student.lrn || '',
        dateOfBirth: student.user.dateOfBirth?.toISOString().split('T')[0] || '', // Format date for input
        gender: student.user.gender || '',
        contactNumber: student.user.contactNumber || '',
        address: student.user.address || '',
        password: '', // Set an empty string for password if you don't want to show it
        guardianName: student.guardianName || '', // Assuming guardianName is not optional here
        yearLevel: student.gradeLevel || 7, // Default to 1 if not set
        sectionID: student.section?.id || null, // Get section ID or null if not available
    };

    const form = await superValidate(studentData, zod(studentFormSchema));

    if (!form.valid) {
        return {
            status: 500,
            error: new Error('Student data validation failed')
        };
    }

    return {
        data: form, // Change this key to 'form' to match your component usage
        sections,
    };
};

export const actions: Actions = {
    default: async ({ request, params }) => {
        const studentId = parseInt(params.id);
        const formData = await request.formData();

        // Extract and parse form data
        const data = {
            firstName: formData.get('firstName')?.toString(),
            lastName: formData.get('lastName')?.toString(),
            email: formData.get('email')?.toString(),
            lrn: formData.get('lrn')?.toString(),
            dateOfBirth: formData.get('dateOfBirth')?.toString(),
            gender: formData.get('gender')?.toString(),
            contactNumber: formData.get('contactNumber')?.toString(),
            address: formData.get('address')?.toString(),
            password: formData.get('password')?.toString(), // Consider hashing this
            guardianName: formData.get('guardianName')?.toString(),
            yearLevel: parseInt(formData.get('yearLevel')?.toString() || '0'),
            sectionID: formData.get('sectionID') ? parseInt(formData.get('sectionID')?.toString() || '0') : null,
            strandID: formData.get('strandID') ? parseInt(formData.get('strandID')?.toString() || '0') : null,
        };

        try {
            await prisma.student.update({
                where: { id: studentId },
                data,
            });

            return {
                status: 200,
                body: {
                    message: 'Student updated successfully'
                }
            };
        } catch (error) {
            console.error('Update error:', error); // Log the error for debugging
            return {
                status: 500,
                error: new Error('Failed to update student')
            };
        }
    }
};
