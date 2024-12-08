import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
    // const session = event.locals.session;

    // // Check if the session exists
    // if (!session) {
    //     throw redirect(302, '../login');
    // }


    const totalStudents = await prisma.student.count();

    const totalTeachers = await prisma.teacher.count();

    const totalSections = await prisma.section.count();

    const totalDepartments = await prisma.department.count();

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
