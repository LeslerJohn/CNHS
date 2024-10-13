import type { PageServerLoad } from './$types';

import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	const strands = await prisma.strand.findMany();
    const sections = await prisma.section.findMany({
        include: {
          strand: true, // Include strand information
          room: true,   // Include room information
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

	return { strands, sections};
};