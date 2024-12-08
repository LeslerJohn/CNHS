import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { prisma } from '$lib/server/prisma';
import { addScheduleFormSchema } from '$lib/components/custom/forms/add-schedule-form/schema';
import type { PageServerLoad, Actions } from './$types';
import { redirect, error } from '@sveltejs/kit';

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

    const formData = {
        subjectOnSectionId: subjectOnSectionId,
        teachers: teachers.map((teacher) => teacher.id)
    }

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

        // Default date to append to the time
        const defaultDate = new Date().toISOString().split('T')[0];

        // Ensure startTime and endTime are in the correct DateTime format
        const startDateTime = `${defaultDate}T${startTime}:00`;  // Add seconds to make it a full DateTime
        const endDateTime = `${defaultDate}T${endTime}:00`;

        const checkStartDateTime = new Date(startDateTime);  // Convert string to Date object
        const checkEndDateTime = new Date(endDateTime);

        let sectionId = 0;

        try {
            const conflictingSchedule = await prisma.schedule.findFirst({
                where: {
                    subjectOnSections: {
                        some: {
                            teacherId: teacherId,
                        },
                    },
                    dayOfWeek: {
                        in: dayOfWeek, // Check if dayOfWeek matches any of the provided days
                    },
                    OR: [
                        {
                            startTime: {
                                lte: checkEndDateTime, // Start time is before or at the end of the new schedule
                            },
                            endTime: {
                                gte: checkStartDateTime, // End time is after or at the start of the new schedule
                            },
                        },
                    ],
                },
            });

            if (conflictingSchedule) {
                throw new Error('The teacher is already occupied at this time on the selected day(s).');
            }

            const newSchedule = await prisma.schedule.create({
                data: {
                    dayOfWeek: dayOfWeek.toString(),
                    startTime: new Date(startDateTime), // Convert string to Date
                    endTime: new Date(endDateTime),     // Convert string to Date
                }
            });

            await prisma.subjectonSections.update({
                where: { id: subjectOnSectionId },
                data: {
                    scheduleId: newSchedule.id,
                    teacherId,
                },
            });

            const section = await prisma.subjectonSections.findFirst({
                where: { id: subjectOnSectionId },
                select: { sectionId: true }
            });
            if (section) {
                sectionId = section.sectionId;
            } else {
                throw new Error('Section not found');
            }
        } catch (err) {
            console.error('Error adding schedule to subject on section:', err);
            error(400, 'Failed to add teacher to section');
        }
        
        throw redirect(302, `../${sectionId}`);
    }
};