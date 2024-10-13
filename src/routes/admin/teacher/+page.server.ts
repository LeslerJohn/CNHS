import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
    const teachers = await prisma.teacher.findMany({
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    middleName: true
                }
            }
        }
    });

    // Map the result to include the full name directly in the teacher object
    const teachersWithFullName = teachers.map(teacher => ({
        ...teacher,
        fullName: teacher.user ? `${teacher.user.firstName} ${teacher.user.middleName ? teacher.user.middleName + ' ' : ''}${teacher.user.lastName}` : ''
    }));

    return { teachers: teachersWithFullName };
};