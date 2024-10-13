import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { superValidate, type SuperValidated } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { roomFormSchema } from '$lib/components/custom/forms/room-form/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod(roomFormSchema)) };
}

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const roomNumber = formData.get('roomNumber')?.toString() || '';
        const building = formData.get('building')?.toString() || '';
        const capacity = Number(formData.get('capacity')) ?? 0;

        // Validate form data using your schema
        const validation = roomFormSchema.safeParse({ roomNumber, building, capacity });

        if (!validation.success) {
            const errors = validation.error.flatten().fieldErrors;
            return { 
                status: 400, 
                errors 
            };
        }

        try {
            // Create a new department in the database
            const subject = await prisma.room.create({
                data: {
                    roomNumber,
                    building,
                    capacity,
                }
            });

            // Redirect to a new page or subject page after successful creation
            redirect(302, `../`);
        } catch (err) {
            console.error(err);
            return {
                status: 500,
                errors: { message: 'Error creating subject' }
            };
        }
    }
};
