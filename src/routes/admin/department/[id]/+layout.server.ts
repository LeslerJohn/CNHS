import type { LayoutServerLoad } from './$types';

import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ params }) => {
	const departmentId = parseInt(params.id);
	const department = await prisma.department.findFirst({
		where: { id: departmentId }
	});

	if (department === null) {
		error(404, { message: 'Department not found' });
	}

	return { department };
};