    import type { PageServerLoad } from "./$types";

    export const load: PageServerLoad = async ({ params }) => {
        const sectionId = Number(params.id);
        
        const section = await prisma.section.findFirst({
            where: {
                id: sectionId
            }
        });

        const adviser = await prisma.teacher.findFirst({
            where: {
                id: Number(section?.adviserID)
            },
            include: {
                user: {
                    select: {
                        firstName: true,
                        middleName: true,
                        lastName: true
                    }
                }
            }
        });

        const students = await prisma.student.findMany({
            where: {
                sections: {
                    some: {
                        sectionId
                    }
                }
            },
            include: {
                user: {
                    select: {
                        firstName: true,
                        middleName: true,
                        lastName: true,
                        gender: true
                    }
                }
            }
        });

        const maleCount = students.filter(student => student.user.gender === 'Male').length;
        const femaleCount = students.filter(student => student.user.gender === 'Female').length;
        const totalCount = students.length;

        return {
            totalCount,
            maleCount,
            femaleCount,
            adviser,
            students,
            section
        };
    };