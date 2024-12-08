import type { LayoutServerLoad } from './$types';

import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ params }) => {
	const programId = parseInt(params.id, 10);
	const program = await prisma.governmentProgram.findFirst({
		where: { id: programId }
	});

	const students = await prisma.studentOnPrograms.findMany({
		where: {
			programId: programId
		},
		include: {
			student: {
				select: {
					user: {
						select: {
							firstName: true,
							middleName: true,
							lastName: true,
						}
					},
					lrn: true
				}
			}
		}
	});

	if (program === null) {
		error(404, { message: 'Program not found' });
	}

	return { program, students };
};