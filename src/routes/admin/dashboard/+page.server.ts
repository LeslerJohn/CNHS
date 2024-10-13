import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    // Count total number of students
    const totalStudents = await prisma.student.count();

    // Count total number of teachers
    const totalTeachers = await prisma.teacher.count();

    // Count total number of active sections
    const totalSections = await prisma.section.count();

    // Count total number of departments
    const totalDepartments = await prisma.department.count();

    // Count total number of government programs
    const totalGovernmentPrograms = await prisma.governmentProgram.count();

    const totalSubjects = await prisma.subject.count();

    return {
        totalStudents,
        totalTeachers,
        totalSections,
        totalDepartments,
        totalGovernmentPrograms,
        totalSubjects
    };
};
