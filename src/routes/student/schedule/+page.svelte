<script lang="ts">
    import type { PageData } from './$types';
    import * as Table from "$lib/components/ui/table/index.js";

    export let data: PageData;

    const { student } = data;
</script>

<div class="rounded-lg bg-white p-4">
    <h2 class="mb-4 text-3xl">
        Schedule for {student.firstName} {student.lastName}
    </h2>

    {#if student.sections.length > 0}
        {#each student.sections as section}
            <div class="mb-4 p-4 border border-gray-300 rounded-lg">
                <h3 class="mb-2 text-xl font-semibold">Section: {section.name}</h3>
                <p>Year Level: {section.yearLevel}</p>
                <p>School Year: {section.startSchoolYear} - {section.startSchoolYear + 1}</p>

                <Table.Root class="w-full border border-gray-300 rounded-lg">
                    <Table.Caption class="text-lg font-semibold mb-2">Subjects Schedule</Table.Caption>
                    <Table.Header class="bg-gray-100">
                        <Table.Row>
                            <Table.Head class="border border-gray-300 p-2">Subject</Table.Head>
                            <Table.Head class="border border-gray-300 p-2">Day</Table.Head>
                            <Table.Head class="border border-gray-300 p-2">Time</Table.Head>
                            <Table.Head class="border border-gray-300 p-2">Room</Table.Head>
                            <Table.Head class="border border-gray-300 p-2">Teacher</Table.Head>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {#each section.subjects as subject}
                            <Table.Row class="border-t border-gray-300">
                                <Table.Cell class="border border-gray-300 p-2 font-medium">{subject.name}</Table.Cell>
                                <Table.Cell class="border border-gray-300 p-2">{subject.dayOfWeek}</Table.Cell>
                                <Table.Cell class="border border-gray-300 p-2">{subject.startTime} to {subject.endTime}</Table.Cell>
                                <Table.Cell class="border border-gray-300 p-2">{section.room}</Table.Cell>
                                <Table.Cell class="border border-gray-300 p-2">{subject.teacher}</Table.Cell>
                            </Table.Row>
                        {/each}
                    </Table.Body>
                </Table.Root>
            </div>
        {/each}
    {:else}
        <p class="text-gray-500">No schedule found.</p>
    {/if}
</div>