<script lang='ts'>
    import type { PageData } from './$types';
    import * as Table from "$lib/components/ui/table/index.js";

    export let data: PageData;
    
    const { section } = data;

    	// Function to format ISO strings into 12-hour format safely
	function formatTime(isoString: string): string {
		const date = new Date(isoString); // Parse ISO strings into valid Date objects
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const period = hours >= 12 ? 'PM' : 'AM';
		const formattedHours = hours % 12 || 12; // Handle edge case for 0 hours as 12

		return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
	}
</script>

<main>
    <h1 class="text-2xl font-bold mb-4">Section Details</h1>

    {#if section}
        <div class="space-y-4">
            <!-- Section Basic Details -->
            <div class="bg-white p-6 border border-gray-200 rounded-lg shadow-sm space-y-2">
                <p class="text-gray-700"><strong class="font-semibold">ID:</strong> {section.id}</p>
                <p class="text-gray-700"><strong class="font-semibold">Name:</strong> {section.name}</p>
                <p class="text-gray-700"><strong class="font-semibold">Year Level:</strong> {section.yearLevel}</p>
                <p class="text-gray-700"><strong class="font-semibold">School Year:</strong> {section.startSchoolYear} - {section.startSchoolYear + 1}</p>

                {#if section.room}
                    <p class="text-gray-700"><strong class="font-semibold">Room Number:</strong> {section.room.roomNumber}</p>
                {/if}

                {#if section.teacher && section.teacher.user}
                    <p class="text-gray-700"><strong class="font-semibold">Adviser:</strong> {section.teacher.user.firstName} {section.teacher.user.lastName}</p>
                {/if}
            </div>

            <!-- Available Subjects Table -->
            <div class="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
                <h2 class="text-lg font-semibold mb-4">Available Subjects</h2>
                <Table.Root class="w-full border border-gray-300 rounded-lg">
                    <Table.Caption class="text-lg font-semibold mb-2">Subjects Schedule</Table.Caption>
                    <Table.Header class="bg-gray-100">
                        <Table.Row>
                            <Table.Head class="border border-gray-300 p-2">Subject</Table.Head>
                            <Table.Head class="border border-gray-300 p-2">Day</Table.Head>
                            <Table.Head class="border border-gray-300 p-2">Time</Table.Head>
                            <Table.Head class="border border-gray-300 p-2">Teacher</Table.Head>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {#if section.subjects}
                            {#each section.subjects as subjectOnSection}
                                <Table.Row class="border-t border-gray-300">
                                    <Table.Cell class="border border-gray-300 p-2 font-medium">{subjectOnSection.subject.name}</Table.Cell>
                                    <Table.Cell class="border border-gray-300 p-2">
                                        {subjectOnSection.schedule?.dayOfWeek 
                                            ? Array.isArray(subjectOnSection.schedule.dayOfWeek) 
                                                ? subjectOnSection.schedule.dayOfWeek.join(", ") 
                                                : subjectOnSection.schedule.dayOfWeek
                                            : "TBA"}
                                    </Table.Cell>
                                    <Table.Cell class="border border-gray-300 p-2">
                                        {subjectOnSection.schedule?.startTime
                                            ? `${formatTime(subjectOnSection.schedule.startTime.toISOString())} to ${formatTime(subjectOnSection.schedule.endTime.toISOString())}`
                                            : "TBA"}
                                    </Table.Cell>
                                    <Table.Cell class="border border-gray-300 p-2">
                                        {subjectOnSection.teacher 
                                            ? `${subjectOnSection.teacher.user?.firstName} ${subjectOnSection.teacher.user?.lastName}`
                                            : "TBA"}
                                    </Table.Cell>
                                </Table.Row>
                            {/each}
                        {:else}
                            <Table.Row>
                                <Table.Cell class="text-center text-gray-500 p-4" colspan={5}>
                                    No subjects available
                                </Table.Cell>
                            </Table.Row>
                        {/if}
                    </Table.Body>
                </Table.Root>
            </div>

            <!-- Actions Section -->
            <div class="mt-4 flex space-x-4">
                <a href="./{section.id}/edit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Edit Section</a>
                <a href="./{section.id}/addSubject" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Add Subject</a>
                <a href="./{section.id}/students" class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition">See Students</a>
            </div>
        </div>
    {/if}
</main>

<style>
    main {
        padding: 1rem;
    }
    h1 {
        font-size: 2rem;
    }
</style>
