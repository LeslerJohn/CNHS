<script lang="ts">
	import { page } from '$app/stores';

	export let id;

	import * as Collapsible from '$lib/components/ui/collapsible';
</script>

<!-- <aside
    class="fixed left-0 top-0 z-10 ml-12 mt-24 flex h-[80dvh] w-64 flex-col justify-between overflow-y-auto rounded-lg bg-gray-100 p-5 shadow-lg"
>
	<nav>
		<ul class="space-y-4">
			<li aria-current={$page.url.pathname === '/dashboard' ? 'page' : undefined}>
				<a href="/admin/dashboard" class="block rounded p-2">Dashboard</a>
			</li>
			<li>
				<Collapsible.Root>
					<Collapsible.Trigger
						aria-current={$page.url.pathname === '/teacher' ? 'page' : undefined}
						class="block p-2"
					>
						<a href="/admin/teacher">Teacher</a>
					</Collapsible.Trigger>
					<Collapsible.Content class="ml-3 mt-1 rounded p-2">Assign Department</Collapsible.Content>
				</Collapsible.Root>
			</li>
			<li>
				<Collapsible.Root>
					<Collapsible.Trigger
						aria-current={$page.url.pathname === '/class' ? 'page' : undefined}
						class="block rounded p-2"
					>
						<a href="/admin/class">Class</a>
					</Collapsible.Trigger>
					<Collapsible.Content class="ml-3 mt-1 rounded p-2"><a href="/admin/student">Student</a></Collapsible.Content>
                    <Collapsible.Content class="ml-3 mt-1 rounded p-2">Assign Teacher</Collapsible.Content>
				</Collapsible.Root>
			</li>
			<li aria-current={$page.url.pathname === '/schedule' ? 'page' : undefined}>
				<a href="/admin/schedule" class="block rounded p-2">Schedule</a>
			</li>
			<li aria-current={$page.url.pathname === '/subject' ? 'page' : undefined}>
				<a href="/admin/subject" class="block rounded p-2">Subject</a>
			</li>
			<li>
				<Collapsible.Root>
					<Collapsible.Trigger
						aria-current={$page.url.pathname === '/department' ? 'page' : undefined}
						class="block rounded p-2"
					>
						<a href="/admin/department">Department</a>
					</Collapsible.Trigger>
					<Collapsible.Content class="ml-3 mt-1 rounded p-2"><a href="/admin/department/addTeacher">Add Teacher</a></Collapsible.Content>
				</Collapsible.Root>
			</li>
			<li aria-current={$page.url.pathname === '/governmentProgram' ? 'page' : undefined}>
				<a href="/admin/governmentProgram" class="block rounded p-2">Government Program</a>
			</li>
			<li aria-current={$page.url.pathname === '/room' ? 'page' : undefined}>
				<a href="/admin/room" class="block rounded p-2">Room</a>
			</li>
		</ul>
	</nav>
	<div class="mt-auto flex justify-between">
		<ul class="space-y-2">
			<li><a href="/" class="text-gray-800 no-underline hover:underline">Help</a></li>
			<li><a href="/logout" class="text-gray-800 no-underline hover:underline">Logout</a></li>
		</ul>
	</div>
</aside> -->

<aside>
    <nav>
        <ul>
            <li aria-current={$page.url.pathname === '/dashboard' ? 'page' : undefined}>
                <a href="/admin/dashboard">Deshboard</a>
            </li>
            <li aria-current={$page.url.pathname === '/teacher' ? 'page' : undefined}>
                <a href="/admin/teacher">Teacher</a>
            </li>
            <li aria-current={$page.url.pathname === '/class' ? 'page' : undefined}>
                <a href="/admin/class">Class</a>
            </li>
            <li aria-current={$page.url.pathname === '/schedule' ? 'page' : undefined}>
                <a href="/admin/schedule">Schedule</a>
            </li>
			<li aria-current={$page.url.pathname === '/subject' ? 'page' : undefined}>
                <a href="/admin/subject">Subject</a>
            </li>
            <li aria-current={$page.url.pathname === '/department' ? 'page' : undefined}>
                <a href="/admin/department">Department</a>
            </li>
            <li aria-current={$page.url.pathname === '/governmentProgram' ? 'page' : undefined}>
                <a href="/admin/governmentProgram">Government Program</a>
            </li>
			<li aria-current={$page.url.pathname === '/room' ? 'page' : undefined}>
                <a href="/admin/room">Room</a>
            </li>
        </ul>
    </nav>
    <div>
        <ul>
            <li>
                <a href="/">Help</a>
            </li>
            <li>
                <a href="/logout">Logout</a>
            </li>
        </ul>
    </div>
</aside>

<section {id} class="ml-80 p-8">
	<div class="mx-auto flex w-full max-w-7xl flex-1 flex-col">
		<slot />
	</div>
</section>

<style>
	
	aside {
        position: fixed;
        top: 0;
        left: 0;
        width: 250px;
        height: 80dvh;
        background-color: #f1f1f1;
        padding: 20px;
        z-index: 1;
        margin-top: 120px;
        margin-left: 50px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    aside nav ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    aside nav ul li {
        margin-bottom: 20px;
    }

    aside nav ul li a {
        color: #333;
        text-decoration: none;
    }
    
    aside div {
        margin-top: auto;
        display: flex;
        justify-content: space-between;
    }

    aside div ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    aside div ul li {
        margin-top: 10px;
    }

    section {
        padding: 30px;
        margin-left: 300px;
    }
</style>
