import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export type UserData = {
    UserID: number;
    FirstName: string;
    LastName: string;
    UserType: string;
    student?: {
        section?: {
            SectionName: string;
        };
    };
    teacher?: {
        Department?: string;
        Position?: string;
        AdviserOfSections?: {
            SectionName: string;
        }[];
    };
};

export const load: PageServerLoad = async () => {
    const users = await prisma.user.findMany({
        include: {
            Student: {
                include: {
                    section: true, // Include the section the student belongs to
                },
            },
            Teacher: {
                include: {
                    Sections: true, // Include the sections the teacher advises
                },
            },
        },
    });

    console.log('Fetched users:', users);

    const formattedUsers = users.map(user => ({
        UserID: user.id,
        FirstName: user.firstName,
        LastName: user.lastName,
        UserType: user.Student ? 'Student' : user.Teacher ? 'Teacher' : 'Admin', // Assuming 'Admin' for users who are neither students nor teachers
        student: user.Student ? {
            section: user.Student.section ? {
                SectionName: user.Student.section.sectionName,
            } : undefined,
        } : undefined,
        teacher: user.Teacher ? {
            Department: user.Teacher.department,
            Position: user.Teacher.position,
            AdviserOfSections: user.Teacher.Sections.map(section => ({
                SectionName: section.sectionName,
            })),
        } : undefined,
    }));
    

    // console.log('Formatted users:', formattedUsers);

    return {
        users: formattedUsers,
    };
};
