<script lang='ts'>
    import type { PageData } from './$types';
    import * as Table from "$lib/components/ui/table/index.js";

    export let data: PageData;
    
    const { program, students } = data;
</script>

<main>
    <h1 class="text-3xl mb-6">Program Details</h1>
    <p class="mb-4"><strong>ID:</strong> {program.id}</p>
    <p class="mb-4"><strong>Name:</strong> {program.name}</p>
    <p class="mb-6"><strong>Description:</strong> {program.description}</p>

    <h2 class="text-xl mb-2">Student Members</h2>
    <Table.Root class="w-full border border-gray-300 rounded-lg">
        <Table.Caption class="text-lg font-semibold mb-2">Student Members</Table.Caption>
        <Table.Header class="bg-gray-100">
            <Table.Row>
                <Table.Head class="border border-gray-300 p-2">LRN</Table.Head>
                <Table.Head class="border border-gray-300 p-2">First Name</Table.Head>
                <Table.Head class="border border-gray-300 p-2">Middle Name</Table.Head>
                <Table.Head class="border border-gray-300 p-2">Last Name</Table.Head>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {#each students as studentRecord}
                <Table.Row class="border-t border-gray-300">
                    <Table.Cell class="border border-gray-300 p-2">{studentRecord.student?.lrn ?? ''}</Table.Cell>
                    <Table.Cell class="border border-gray-300 p-2 font-medium">{studentRecord.student?.user?.firstName ?? ''}</Table.Cell>
                    <Table.Cell class="border border-gray-300 p-2">{studentRecord.student?.user?.middleName ?? ''}</Table.Cell>
                    <Table.Cell class="border border-gray-300 p-2">{studentRecord.student?.user?.lastName ?? ''}</Table.Cell>
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>

    <div class="flex space-x-4 mt-4">
        <a href="./{program.id}/edit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit program</a>
        <a href="./{program.id}/addStudent" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add students</a>
    </div>
</main>
