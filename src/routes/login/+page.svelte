<script lang="ts">
    import type { PageData } from './$types';
    import { redirect } from '@sveltejs/kit';
    import LoginForm from '$lib/components/custom/forms/login-form/login-form.svelte';
    export let data: PageData;
</script>

<section class="flex flex-col items-center justify-center h-full w-full flex-1">
    <div class="flex mb-8">
        <img src="src\lib\images\logo.jpg" alt="CNHS LOGO" class="h-24 mb-5">
        <p class="h-24 w-2 bg-blue-600 mx-4"></p>
        <div class="text-md">
            <h1 class="text-4xl font-bold">Student Portal</h1>
            <small>Sign in to start your session.</small>
        </div>
    </div>
    <div class="p-5 w-full max-w-md">
        <LoginForm data={data.form} />
    </div>
</section>
