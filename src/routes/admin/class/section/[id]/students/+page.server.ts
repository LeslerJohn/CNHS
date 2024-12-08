import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params }) => {
	const sectionId = Number(params.id);

	// Fetch section details
	const section = await prisma.section.findFirst({
		where: { id: sectionId },
		select: { id: true, name: true },
	});

	// Fetch students in the section
    const students = await prisma.studentOnSections.findMany({
        where: {
            sectionId: sectionId,
        },
        include: {
            student: {
                select: {
                    user: {
                        select: {
                            firstName: true,
                            middleName: true,
                            lastName: true,
                        },
                    },
                    lrn: true,
                },
            },
        },
    });

	return {
		section,
		students,
	};
};
