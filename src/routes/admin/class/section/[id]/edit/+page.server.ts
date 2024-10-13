import { superValidate } from 'sveltekit-superforms';
import { sectionFormSchema } from '$lib/components/custom/forms/section-form/schema';
import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const sectionId = Number(params.id);

    try {
        // Fetch section data for editing
        const section = await prisma.section.findUnique({
            where: { id: sectionId },
            include: {
                room: true,
                strand: true,
                teacher: {
                    include: { user: true }
                }
            }
        });

        if (!section) throw new Error('Section not found');

		 // Only pass the fields required by the form
		const formData = {
            name: section.name,
            yearLevel: section.yearLevel,
            roomID: section.room?.id || null,
            strandID: section.strand?.id || null,
            adviserID: section.teacher?.id || null
        };

        // Pass the formData and schema into superValidate
        const form = await superValidate(formData, sectionFormSchema);



        const rooms = await prisma.room.findMany({ select: { id: true, roomNumber: true } });
        const strands = await prisma.strand.findMany({ select: { id: true, name: true } });
        const advisers = await prisma.teacher.findMany({
            select: {
                id: true,
                user: { select: { firstName: true, lastName: true } }
            }
        });

        return {
            form,
            rooms,
            strands,
            advisers: advisers.map(adviser => ({
                id: adviser.id,
                name: adviser.user ? `${adviser.user.firstName} ${adviser.user.lastName}` : 'No Adviser'
            }))
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to load section data');
    }
};
