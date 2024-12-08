import type { PageServerLoad } from './$types';

import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params }) => {
    const sectionId = parseInt(params.id);
    const section = await prisma.section.findFirst({
        where: { id: sectionId },
        include: {
            room: true,
            teacher: {
                select: {
                    user: {
                        select: {
                            firstName: true, // Fetch adviser first name
                            lastName: true,  // Fetch adviser last name
                        },
                    },
                },
            },
            subjects: {
                include: {
                    subject: {
                        select: {
                            name: true, // Fetch subject name
                        },
                    },
                    schedule: {
                        select: {
                            dayOfWeek: true, // Fetch schedule day of the week
                            startTime: true, // Fetch schedule start time
                            endTime: true,   // Fetch schedule end time
                        },
                    },
                    teacher: {
                        select: {
                            user: {
                                select: {
                                    firstName: true, // Fetch teacher first name
                                    lastName: true,  // Fetch teacher last name
                                },
                            },
                        },
                    }
                },
            },
        },
    });

    if (!section) {
        throw error(404, 'Section not found');
    }

	return {section};
};