import { z } from 'zod';

export const roomFormSchema = z.object({
	roomNumber: z.string().min(1, { message: 'Name is required' }),
	building: z.string().min(1, { message: 'Description is required' }),
	capacity: z.number().min(1, { message: 'Capacity is required' })
});

export type RoomFormSchema = typeof roomFormSchema;