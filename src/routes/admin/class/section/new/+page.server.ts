import { prisma } from '$lib/server/prisma'; // Assuming you have a prisma client setup
import { fail, redirect } from '@sveltejs/kit';
import { sectionFormSchema } from './schema';
import type { RequestEvent } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	try {
        const form = await superValidate(zod(sectionFormSchema));

		const rooms = await prisma.room.findMany({
			select: { id: true, roomNumber: true }
		});

		// const strands = await prisma.strand.findMany({
		// 	select: { id: true, name: true }
		// });

		const advisers = await prisma.teacher.findMany({
			select: {
				id: true,
				user: {
					select: {
						firstName: true,
						lastName: true
					}
				}
			}
		});

		return {
            form,
			rooms,
			advisers: advisers.map((adviser) => ({
				id: adviser.id,
				name: adviser.user ? `${adviser.user.firstName} ${adviser.user.lastName}` : 'No Adviser Name'
			}))
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
};

export const actions = {
	default: async ({ request }: RequestEvent) => {
		const formData = Object.fromEntries(await request.formData());
		
		// Convert relevant fields to numbers
		const parsedFormData = {
			...formData,
			yearLevel: Number(formData.yearLevel),
			startSchoolYear: Number(formData.startSchoolYear),
			roomID: formData.roomID ? Number(formData.roomID) : null, 
			adviserID: formData.adviserID ? Number(formData.adviserID) : null,
			isActive: formData.isActive === 'true'
		};

		// Validate parsed form data
		const validation = sectionFormSchema.safeParse(parsedFormData);

		if (!validation.success) {
			return fail(400, { errors: validation.error.flatten() });
		}

		const { name, yearLevel, startSchoolYear, isActive, roomID, adviserID } = validation.data;

		try {
			await prisma.section.create({
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
			console.error('Error creating section:', error);
			return fail(500, { message: 'Unable to create section' });
		}

		throw redirect(302, `../`);
	}
};
