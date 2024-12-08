import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    if (!event.locals.session) {
        return fail(401);
    }

    // Invalidate the session
    await lucia.invalidateSession(event.locals.session.id);

    // Create a blank session cookie
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '.',
        ...sessionCookie.attributes
    });

    // Redirect to the login page
    throw redirect(302, '/login'); // Use throw for the redirect
};