import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { roomFormSchema } from '$lib/components/custom/forms/room-form/schema';
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params }) => {
	const roomId = parseInt(params.id);
	const room = await prisma.room.findUnique({ where: { id: roomId } });

	if (!room) {
		throw redirect(302, '/404'); 
	}

	return {
		form: await superValidate(
			{
				roomNumber: room.roomNumber ?? '',
				building: room.building ?? '',
				capacity: room.capacity ?? 0
			},
			zod(roomFormSchema)
		)
	};
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const form = await superValidate(request, zod(roomFormSchema));

		if (!form.valid) {
			// Return form with errors
			return fail(400, { form });
		}

		const roomId = parseInt(params.id);

		try {
			await prisma.room.update({
				data: form.data,
				where: { id: roomId }
			});
		} catch (error) {
			return fail(500, { message: 'Failed to update room', form });
		}

		throw redirect(302, `../`);
	}
};
