import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const teacherId = parseInt(params.id);
	const teacher = await prisma.teacher.findFirst({
		where: { id: teacherId },
        include: {
            user: true
        }
	});

	if (teacher === null) {
		error(404, { message: 'Teacher not found' });
	}

    console.log('Teacher:', teacher);

	return { teacher };
};