import type { Actions, PageServerLoad } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { superValidate, type SuperValidated } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from '../../lib/components/custom/forms/login-form/schema';
import { login } from '$lib/server/auth';

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod(formSchema)), role : 'admin' };
}

export const actions: Actions = {
	default: async (event) => {
		// Validate the form with proper typing
		const form = await superValidate(event, zod(formSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		// Extract form data (username and password) properly typed
		const { username, password } = form.data;
		console.log('Attempting login with:', { username, password });

		try {
			// Call the login function and get the role
			const role = await login(username, password);
			console.log('Login successful, role:', role);


			// Redirect based on the role
			if (role === 'admin') {
				console.log('Redirecting to admin...');
				throw redirect(302, '/admin/dashboard');
			} else if (role === 'teacher') {
				console.log('Redirecting to teacher...')
				throw redirect(302, '/teacher/dashboard');
			} else if (role === 'student') {
				console.log('Redirecting to student...')
				throw redirect(302, '/student/dashboard');
			}

		} catch (error) {
			// Handle login error
			return fail(400, {
				form,
				error: 'Invalid login credentials'
			});
		}
	}
};
