import type { LayoutServerLoad } from './$types';

import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ params }) => {
	const departmentId = parseInt(params.id);
	const department = await prisma.department.findFirst({
		where: { id: departmentId }
	});

	const teachers = await prisma.teacherOnDepartments.findMany({
		where: {
			departmentId: departmentId
		},
		include: {
			teacher: {
				select: {
					user: {
						select: {
							firstName: true,
							middleName: true,
							lastName: true
						}
					},
					position: true
				}
			}
		}
	});

	if (department === null) {
		error(404, { message: 'Department not found' });
	}

	return { department, teachers };
};