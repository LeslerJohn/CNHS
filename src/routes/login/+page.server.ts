import type { Actions, PageServerLoad } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { superValidate, type SuperValidated } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from '../../lib/components/custom/forms/login-form/schema';
import { lucia } from '$lib/server/auth.js';

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod(formSchema)), role: 'admin' };
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(formSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { username, password } = form.data;

		let role;
		try {
			const user = await prisma.user.findFirst({
				where: {
					OR: [
						{ email: username },
						{ Teacher: { employeeId: username } },
						{ Student: { lrn: username } }
					]
				},
				include: {
					Teacher: true,
					Student: true
				}
			});

			if (!user) {
				console.error('User not found');
				throw new Error('Invalid login credentials');
			}

			console.log('User found:', user);

			if (user.password !== password) {
				console.error('Password mismatch');
				throw new Error('Invalid login credentials');
			}

			const session = await lucia.createSession(user.id, []);
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
			console.log('Session created:', session);

			if (user.isAdmin) {
				role = 'admin';
			} else if (user.Teacher) {
				role = 'teacher';
			} else if (user.Student) {
				role = 'student';
			}
			console.log('Role detected:', role);

		} catch (err) {
			console.error('Error logging in:', err);
			return fail(500, { message: 'Error logging in' });
		}

		if (role === 'admin') {
			redirect(302, '/admin/dashboard');
		} else if (role === 'teacher') {
			redirect(302, '/teacher/dashboard');
		} else if (role === 'student') {
			console.log('Redirecting to student...');
			redirect(302, '/student/profile');
		}
	}
};
