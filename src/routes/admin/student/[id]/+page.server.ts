import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const studentId = parseInt(params.id);
	const student = await prisma.student.findFirst({
		where: { id: studentId },
        include: {
            user: true,
            section: true
        }
	});

	if (student === null) {
		error(404, { message: 'Student not found' });
	}

    console.log('Student:', student);

	return { student };
};