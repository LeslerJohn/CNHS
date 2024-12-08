import type { PageServerLoad } from './$types';

import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
    const sections = await prisma.section.findMany({
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
        },
        });

	return {sections};
};