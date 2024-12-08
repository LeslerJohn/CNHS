import { superValidate } from 'sveltekit-superforms';
import { sectionFormSchema } from '$lib/components/custom/forms/section-form/schema';
import { prisma } from '$lib/server/prisma';
import { error, redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const sectionId = parseInt(params.id);

    try {
        const section = await prisma.section.findUnique({
            where: { id: sectionId },
            include: {
                room: true,
                teacher: {
                    include: { user: true }
                }
            }
        });

        if (!section) throw new Error('Section not found');

		const formData = {
            name: section.name,
            yearLevel: section.yearLevel,
            startSchoolYear: section.startSchoolYear,
            roomID: section.room?.id || null,
            adviserID: section.teacher?.id || null,
            isActive: section.isActive
        };

        // Pass the formData and schema into superValidate
        const form = await superValidate(formData, zod(sectionFormSchema));



        const rooms = await prisma.room.findMany({ select: { id: true, roomNumber: true } });
        // const strands = await prisma.strand.findMany({ select: { id: true, name: true } });
        const advisers = await prisma.teacher.findMany({
            select: {
                id: true,
                user: { select: { firstName: true, lastName: true } }
            }
        });

        return {
            form,
            rooms,
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

export const actions: Actions = {
    default: async ({ request, params }) => {
        const formData = Object.fromEntries(await request.formData());

        console.log('formData.isActive before parsing:', formData.isActive);
        
        const parsedFormData = {
            ...formData,
            yearLevel: Number(formData.yearLevel),
            startSchoolYear: Number(formData.startSchoolYear),
            roomID: formData.roomID ? Number(formData.roomID) : null,
            adviserID: formData.adviserID ? Number(formData.adviserID) : null,
            isActive: formData.isActive ? true : false
        };

        console.log('Section Status:', parsedFormData.isActive);

        const validation = sectionFormSchema.safeParse(parsedFormData);

        if (!validation.success) {
            return { form: validation.data, errors: validation.error };
        }

        const { name, yearLevel, startSchoolYear, isActive, roomID, adviserID } = validation.data;

        try {
            await prisma.section.update({
                where: { id: parseInt(params.id) },
                data: {
                    name,
                    yearLevel,
                    startSchoolYear,
                    isActive,
                    roomID,
                    adviserID
                }
            });

        } catch (error) {
            console.error('Error updating section:', error);
            throw new Error('Failed to update section');
        }

        throw redirect(302, '../../');
    }
};
