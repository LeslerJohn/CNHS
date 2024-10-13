import type { LayoutServerLoad } from './$types';

import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ params }) => {
	const roomId = parseInt(params.id);
	const room = await prisma.room.findFirst({
		where: { id: roomId }
	});

	if (room === null) {
		error(404, { message: 'room not found' });
	}

	return { room };
};