import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { roomFormSchema } from '$lib/components/custom/forms/room-form/schema';
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params }) => {
	// Fetch the room using the roomId from params
	const roomId = parseInt(params.id);
	const room = await prisma.room.findUnique({ where: { id: roomId } });

	// Handle case where room is not found
	if (!room) {
		throw redirect(302, '/404'); // Redirect or show error page if the room is not found
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
		// Validate form data
		const form = await superValidate(request, zod(roomFormSchema));

		if (!form.valid) {
			// Return form with errors
			return fail(400, { form });
		}

		const roomId = parseInt(params.id); // Get the room ID from params

		// Update the room in the database
		try {
			await prisma.room.update({
				data: form.data,
				where: { id: roomId }
			});
		} catch (error) {
			// Handle error during the update
			return fail(500, { message: 'Failed to update room', form });
		}

		// Return redirect after successful update
		throw redirect(302, `../`);
	}
};
