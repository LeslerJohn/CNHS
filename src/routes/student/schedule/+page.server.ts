import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
import { redirect, error } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    const session = event.locals.session;

    // Check if the session exists
    if (!session) {
        throw redirect(302, '../login');
    }

    // Fetch student record using the session ID
    const studentRecord = await prisma.student.findUnique({
        where: { id: Number(session.userId) },
        include: {
            user: true,
            sections: {
                include: {
                    section: {
                        include: {
                            room: true,
                            subjects: {
                                include: {
                                    subject: true,
                                    schedule: true,
                                    teacher: {
                                        include: {
                                            user: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    section: {
                        startSchoolYear: 'desc'
                    }
                }
            }
        }
    });

    if (!studentRecord) {
        throw error(404, 'Student not found');
    }

    console.log(`Server Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`);

    // Extract and organize the data
    const sections = studentRecord.sections.map(({ section }) => ({
        name: section.name,
        yearLevel: section.yearLevel,
        startSchoolYear: section.startSchoolYear,
        room: section.room ? section.room.roomNumber : 'N/A',
        subjects: section.subjects.map(subjectOnSection => ({
            name: subjectOnSection.subject.name,
            dayOfWeek: subjectOnSection.schedule?.dayOfWeek || 'N/A',
            startTime: subjectOnSection.schedule
                ? subjectOnSection.schedule.startTime.toLocaleTimeString()
                : 'N/A',
            endTime: subjectOnSection.schedule
                ? subjectOnSection.schedule.endTime.toLocaleTimeString()
                : 'N/A',
            teacher: subjectOnSection.teacher
                ? subjectOnSection.teacher.user
                    ? `${subjectOnSection.teacher.user.firstName} ${subjectOnSection.teacher.user.lastName}`
                    : 'N/A'
                : 'N/A'
        }))
    }));

    return {
        student: {
            firstName: studentRecord.user.firstName,
            lastName: studentRecord.user.lastName,
            sections
        }
    };
};
