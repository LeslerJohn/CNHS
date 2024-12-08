import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const teacherId = Number(locals.user?.id);
    console.log(teacherId);

	if (!teacherId) {
		throw redirect(302, '/login');
	}

	const teacher = await prisma.teacher.findUnique({ where: { id: teacherId },
		include: {
			user: {
				select: {
					firstName: true,
					middleName: true,
					lastName: true,
					email: true
				}
			}
		}
	});

	// Fetch the teacher's advisory section and students
	const advisorySection = await prisma.section.findFirst({
		where: {
			teacher: {
                id: teacherId
            }
		},
		include: {
			students: {
				include: {
					student: {
						include: {
							user: {
								select: {
									firstName: true,
									middleName: true,
									lastName: true
								}
							}
						}
					}
				}
			}
		}
	});

	// Fetch the sections the teacher is teaching based on subjectOnSections.teacherId
	const teachingSections = await prisma.section.findMany({
		where: {
			subjects: {
				some: {
					teacherId: teacherId
				}
			}
		},
	});
	// Fetch the subjects the teacher is teaching
	const teachingSubjects = await prisma.subject.findMany({
		where: {
			sections: {
				some: {
					teacherId: teacherId
				}
			}
		}
	});
	// Fetch the sections and subjects the teacher is teaching along with their schedules
	const teachingDetails = await prisma.section.findMany({
		where: {
			subjects: {
				some: {
					teacherId: teacherId
				}
			}
		},
		include: {
			subjects: {
				where: {
					teacherId: teacherId
				},
				include: {
					schedule: true,
					subject: true,
					section: true
				}
			}
		}
	});

	return {
		teacher,
		advisorySection,
		teachingDetails,
		teachingSubjects
	};
};
