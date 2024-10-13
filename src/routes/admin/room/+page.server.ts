import type { PageServerLoad } from './$types';

import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	const rooms = await prisma.room.findMany();

	return { rooms };
};