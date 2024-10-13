import type { PageServerLoad } from './$types';

import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	const programs = await prisma.governmentProgram.findMany();

	return { programs };
};