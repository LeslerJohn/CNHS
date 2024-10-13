import type { LayoutServerLoad } from './$types';

import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ params }) => {
	const subjectId = parseInt(params.id);
	const subject = await prisma.subject.findFirst({
		where: { id: subjectId }
	});

	if (subject === null) {
		error(404, { message: 'Subject not found' });
	}

	return { subject };
};