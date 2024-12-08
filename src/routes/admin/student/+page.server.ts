import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
    const students = await prisma.student.findMany({
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    middleName: true
                }
            }, 
            section: {
                select: {
                    name: true
                }
            }
        }
    });

    // Map the result to include the full name directly in the student object
    const studentsWithFullName = students.map(student => ({
        ...student,
        fullName: student.user ? `${student.user.firstName} ${student.user.middleName ? student.user.middleName + ' ' : ''}${student.user.lastName}` : ''
    }));

    return { students: studentsWithFullName };
};