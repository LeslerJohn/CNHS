// +page.server.ts
import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';


export const load: PageServerLoad = async (event) => {
    const session = event.locals.session;

    // Check if the session exists
    if (!session) {
        throw redirect(302, '../login');
    }

    // Fetch user data using the session ID
    const studentRecord = await prisma.student.findUnique({
        where: { id: Number(session.userId) }
    });

    if (!studentRecord) {
        throw error(404, 'Student not found');
    }

    try {
        const student = await prisma.student.findUnique({
            where: { id: studentRecord.id },
            include: {
                user: true, // Include the associated user entity
                sections: {
                    include: {
                        section: {
                            include: {
                                teacher: {
                                    include: {
                                        user: true
                                    }
                                },
                                room: true
                            }
                        }
                    }
                },
                governmentPrograms: {
                    include: {
                        governmentProgram: true
                    }
                },

            }
        });

        if (!student) {
            throw error(404, 'Student not found');
        }

        return {
            student
        };
    } catch (err) {
        console.error('Error loading student data:', err);
        throw error(500, 'An error occurred while loading student data');
    }
}
