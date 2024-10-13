import type { PageServerLoad } from './$types';

import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	const subjects = await prisma.subject.findMany();

	return { subjects };
};