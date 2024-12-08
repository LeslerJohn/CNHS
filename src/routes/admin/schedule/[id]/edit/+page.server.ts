import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { prisma } from '$lib/server/prisma';
import { addScheduleFormSchema } from '$lib/components/custom/forms/add-schedule-form/schema';
import type { PageServerLoad, Actions } from './$types';
import { redirect, error } from '@sveltejs/kit';
import { get } from 'http';

export const load: PageServerLoad = async ({ params }) => {
    const subjectOnSectionId = parseInt(params.id, 10);

    const teachers = await prisma.teacher.findMany({
        select: {
            id: true,
            user: {
                select: {
                    firstName: true,
                    lastName: true
                }
            }
        }
    });

    const subjectOnSection = await prisma.subjectonSections.findUnique({
        where: { id: subjectOnSectionId },
        select: {
            id: true,
            subject: {
                select: {
                    name: true
                }
            },
            section: {
                select: {
                    name: true
                }
            },
            teacher: {
                select: {
                    id: true,
                    user: {
                        select: {
                            firstName: true,
                            lastName: true
                        }
                    }
                }
            },
            schedule: {
                select: {
                    dayOfWeek: true,
                    startTime: true,
                    endTime: true
                }
            }
        }
    });

    if (!subjectOnSection) {
        throw error(404, 'Subject on Section not found');
    }

    const formData = {
        subjectOnSectionId: subjectOnSection.id,
        teacherId: subjectOnSection.teacher ? subjectOnSection.teacher.id : null,
        dayOfWeek: subjectOnSection.schedule?.dayOfWeek ? [subjectOnSection.schedule.dayOfWeek] : [],
        startTime: subjectOnSection.schedule?.startTime?.toISOString() ?? undefined,
        endTime: subjectOnSection.schedule?.endTime?.toISOString() ?? undefined
    }

    console.log('Start Time:' ,formData.startTime);
    console.log('End Time', formData.endTime);

    const form = await superValidate(formData, zod(addScheduleFormSchema));

    return {
        form,
        teachers: teachers.map((teacher) => ({
            value: teacher.id,
            label: `${teacher.user?.firstName ?? ''} ${teacher.user?.lastName ?? ''}`
        })),
    };
};

export const actions: Actions = {
    default: async ({ request, params }) => {
        const subjectOnSectionId = parseInt(params.id, 10);

        const formData = await request.formData();
        const teacherId = parseInt(formData.get('teacherId') as string, 10);
        const dayOfWeek = formData.getAll('dayOfWeek') as string[];
        const startTime = formData.get('startTime') as string;
        const endTime = formData.get('endTime') as string;

        console.log(formData);

        // Default date to append to the time
        const defaultDate = new Date().toISOString().split('T')[0];

        // Ensure startTime and endTime are in the correct DateTime format
        const startDateTime = `${defaultDate}T${startTime}:00`;  // Add seconds to make it a full DateTime
        const endDateTime = `${defaultDate}T${endTime}:00`;

        let sectionId = 0;

        try {
            // Get the current schedule and teacher data
            const currentSubjectOnSection = await prisma.subjectonSections.findFirst({
                where: { id: subjectOnSectionId },
                include: {
                    schedule: true,
                    teacher: true
                }
            });

            if (!currentSubjectOnSection) {
                throw new Error('Subject on Section not found');
            }

            // Check if the teacher has changed
            const teacherHasChanged = currentSubjectOnSection.teacherId !== teacherId;

            // If the teacher has changed, ensure no existing assignment with the same teacher
            if (teacherHasChanged) {
                const existingTeacher = await prisma.subjectonSections.findFirst({
                    where: {
                        teacherId: teacherId,
                        subjectId: currentSubjectOnSection.subjectId,
                        sectionId: currentSubjectOnSection.sectionId
                    }
                });

                if (existingTeacher) {
                    throw new Error('Teacher already assigned to this subject in the same section');
                }

                const teacherSchedules = await prisma.schedule.findMany({
                    where: {
                        subjectOnSections: {
                            some: {
                                teacherId: teacherId
                            }
                        }
                    }
                });

                const isTeacherAvailable = teacherSchedules.every(schedule => {
                    const scheduleStart = new Date(`${defaultDate}T${schedule.startTime.toISOString().split('T')[1]}`);
                    const scheduleEnd = new Date(`${defaultDate}T${schedule.endTime.toISOString().split('T')[1]}`);
                    const newStart = new Date(startDateTime);
                    const newEnd = new Date(endDateTime);

                    return (newEnd <= scheduleStart || newStart >= scheduleEnd);
                });

                if (!isTeacherAvailable) {
                    throw new Error('Teacher is not available at the given time');
                }

                if (existingTeacher) {
                    throw new Error('Teacher already assigned to this schedule');
                }
            }

            // Check if the schedule has changed
            const scheduleHasChanged = currentSubjectOnSection.schedule &&
                (currentSubjectOnSection.schedule.dayOfWeek !== dayOfWeek[0] ||
                currentSubjectOnSection.schedule.startTime.toISOString() !== startDateTime ||
                currentSubjectOnSection.schedule.endTime.toISOString() !== endDateTime);

            // If no changes detected, skip the update
            if (!teacherHasChanged && !scheduleHasChanged) {
                console.log('No changes detected, skipping update.');
                return;
            }

            const dayOfWeekString = dayOfWeek.join(',');

            // Update schedule if changes detected
            if (scheduleHasChanged) {
                console.log('Updating schedule...', dayOfWeek, startDateTime, endTime);
                const updatedSchedule = await prisma.schedule.update({
                    where: { id: currentSubjectOnSection.scheduleId ?? undefined },
                    data: {
                        dayOfWeek: dayOfWeekString,
                        startTime: new Date(startDateTime),
                        endTime: new Date(endDateTime)
                    }
                });

                // Update subject on section if teacher or schedule changed
                await prisma.subjectonSections.update({
                    where: { id: subjectOnSectionId },
                    data: {
                        teacherId: teacherId,
                        scheduleId: updatedSchedule.id
                    }
                });
            }

            sectionId = currentSubjectOnSection.sectionId;
        } catch (error) {
            console.error('Error updating subject on section:', error);
            throw new Error('Failed to update subject on section');
        }

        throw redirect(302, `../${sectionId}`);
    }
};
