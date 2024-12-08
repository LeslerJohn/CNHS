import type { PageServerLoad } from './$types';

import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	const programs = await prisma.governmentProgram.findMany({
		include: {
			_count: {
				select: {
					students: true
				}
			}
		}
	});

	return { programs };
};