import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

// export const load: PageServerLoad = async () => {
// 	// Fetch all sections, including related subjects, schedules, and teacher details
// 	const sections = await prisma.section.findMany({
// 		include: {
// 			subjects: {
// 				include: {
// 					subject: true,
// 					schedule: true,
// 					teacher: {
// 						include: { user: true }
// 					}
// 				}
// 			},
// 			room: true, // Include room details if needed
// 			teacher: {
// 				include: { user: true }
// 			}
// 		}
// 	});

// 	return { sections };
// };

export const load: PageServerLoad = async () => {
    const sections = await prisma.section.findMany({
        select: {
            id: true,
            name: true,
            yearLevel: true,
            startSchoolYear: true,
            isActive: true,
            room: {
                select: {
                    id: true,
                    roomNumber: true
                }
            },
            teacher: {
                select: {
                    id: true,
                    user: {
                        select: {
                            firstName: true,
                            middleName: true,
                            lastName: true
                        }
                    }
                }
            }
        }
    });

    return { sections };
};