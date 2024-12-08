<script lang="ts">
    import type { PageData } from './$types';
    import * as Table from "$lib/components/ui/table/index.js";
    import * as Card from "$lib/components/ui/card";

    export let data: PageData;

    const { students, section, adviser, maleCount, femaleCount, totalCount } = data;

</script>

<!-- Redesigned Overview and Summary Statistics -->
<Card.Root class="p-6 mb-6 shadow-md">
    <Card.Header>
        <h2 class="text-2xl font-bold mb-4">Overview</h2>
    </Card.Header>
    <Card.Content class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <!-- Adviser Information -->
        <div class=" p-4 rounded-lg ">
            <h3 class="text-lg font-semibold">Adviser</h3>
            <p class="text-xl font-medium mt-2">{adviser?.user?.lastName}, {adviser?.user?.firstName} {adviser?.user?.middleName ?? ''}</p>

            <h3 class="mt-4 text-lg font-semibold">Section Details</h3>
            <p class="">
                <strong>Grade:</strong> {section?.yearLevel} <br>
                <strong>Section:</strong> {section?.name}<br>
                <strong>SY:</strong> {section?.startSchoolYear ?? 'N/A'} - {(section?.startSchoolYear ?? 0) + 1}
            </p>
        </div>

        <!-- Total Learners -->
        <div class=" p-4 rounded-lg  text-center">
            <h3 class="text-lg font-semibold">No. of Learners</h3>
            <p class="text-5xl font-extrabold mt-4 text-blue-600">{totalCount}</p>
            <p class="text-lg mt-2 text-gray-700">
                Male: {maleCount} | Female: {femaleCount}
            </p>
        </div>
    </Card.Content>
</Card.Root>



{#if section}
    <!-- Section Header -->
    <div class="mb-6">
        <h1 class="text-2xl font-bold mb-2">Students in Section: {section.name}</h1>
        <p class="text-gray-600">Below is the list of students assigned to this section.</p>
    </div>

    <!-- Students Table -->
    {#if students.length > 0}
        <Table.Root class="w-full border border-gray-300 rounded-lg">
            <Table.Caption class="text-lg font-semibold mb-4">Student List</Table.Caption>
            <Table.Header class="bg-gray-100">
                <Table.Row>
                    <Table.Head class="border border-gray-300 p-2">LRN</Table.Head>
                    <Table.Head class="border border-gray-300 p-2">First Name</Table.Head>
                    <Table.Head class="border border-gray-300 p-2">Middle Name</Table.Head>
                    <Table.Head class="border border-gray-300 p-2">Last Name</Table.Head>
                    <Table.Head class="border border-gray-300 p-2">Actions</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each students as student, index}
                    <Table.Row class="border-t border-gray-300">
                        <Table.Cell class="border border-gray-300 p-2">{student.lrn}</Table.Cell>
                        <Table.Cell class="border border-gray-300 p-2">{student.user.firstName}</Table.Cell>
                        <Table.Cell class="border border-gray-300 p-2">{student.user.middleName ?? 'N/A'}</Table.Cell>
                        <Table.Cell class="border border-gray-300 p-2">{student.user.lastName}</Table.Cell>
                        <Table.Cell class="border border-gray-300 p-2">
                            <a
                                href="/teacher/student/{student.id}"
                                class="text-blue-500 hover:underline"
                            >
                                View Details
                            </a>
                        </Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    {:else}
        <p class="text-gray-500">No students are currently assigned to this section.</p>
    {/if}
{:else}
    <p class="text-gray-500">Section information is not available.</p>
{/if}
