import type { PageServerLoad } from './$types';

import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	const departments = await prisma.department.findMany();

	return { departments };
};