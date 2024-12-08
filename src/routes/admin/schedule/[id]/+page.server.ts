import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params }) => {
    const sectionId = Number(params.id);

    const sectionDetails = await prisma.section.findUnique({
        where: { id: sectionId },
        include: {
            subjects: {
                include: {
                    subject: true,
                    teacher: {
                        include: { user: true }
                    },
                    schedule: true
                }
            }
        }
    });


    if (sectionDetails) {
        console.log(sectionDetails.subjects.map(subject => subject.schedule));
    } else {
        console.log('Section details not found');
    }

    return { sectionDetails };
};
