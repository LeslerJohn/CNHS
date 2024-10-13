<script lang="ts">
	import type { PageData } from './$types';
    import { redirect } from '@sveltejs/kit';
	import LoginForm from '$lib/components/custom/forms/login-form/login-form.svelte';
	export let data: PageData;

    /*
    if (data.role === 'admin') {
        console.log('Redirecting to admin...');
        window.location.href = '/admin/dashboard';
    } else if (data.role === 'teacher') {
        console.log('Redirecting to teacher...')
        throw redirect(302, '/teacher/dashboard');
    } else if (data.role === 'student') {
        console.log('Redirecting to student...')
        throw redirect(302, '/student/dashboard');
    }
    */
</script>

<section class="">
    <div class="login-head">
        <img src="src\lib\images\logo.jpg" alt="CNHS LOGO" class="logo">
        <p></p>
        <div>
            <h1 class="text-4xl font-bold">Student Portal</h1>
            <small>Sign in to start your session.</small>
        </div>
    </div>
    <div class="login-form">
        <LoginForm data={data.form} />
    </div>
</section>

<style>
    .logo {
        height: 100px;
        margin-bottom: 20px;
    }

    p {
        height: 100px;
        width: 8px;
        background-color: rgb(32, 95, 203);
        margin: 0 10px 0 20px;
    }

    section {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
    }

    .login-head {
        display: flex;
    }

    .login-form {
        padding: 20px;
        width: 420px;
    }
</style>