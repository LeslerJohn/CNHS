<script lang='ts'>
    import type { PageData } from './$types';
    import * as Table from "$lib/components/ui/table/index.js";

    export let data: PageData;
    
    const { department, teachers } = data;
</script>

<main class="p-4">
    <h1 class="text-2xl mb-4">Department Details</h1>
    <p class="mb-2"><strong>ID:</strong> {department.id}</p>
    <p class="mb-2"><strong>Name:</strong> {department.name}</p>
    <p class="mb-4"><strong>Description:</strong> {department.description}</p>

    <h2 class="text-xl mb-2">Teachers</h2>

    <Table.Root class="w-full border border-gray-300 rounded-lg">
        <Table.Caption class="text-lg font-semibold mb-2">Teachers List</Table.Caption>
        <Table.Header class="bg-gray-100">
            <Table.Row>
                <Table.Head class="border border-gray-300 p-2">Position</Table.Head>
                <Table.Head class="border border-gray-300 p-2">First Name</Table.Head>
                <Table.Head class="border border-gray-300 p-2">Middle Name</Table.Head>
                <Table.Head class="border border-gray-300 p-2">Last Name</Table.Head>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {#each teachers as teacherRecord}
                <Table.Row class="border-t border-gray-300">
                    <Table.Cell class="border border-gray-300 p-2">{teacherRecord.teacher?.position ?? ''}</Table.Cell>
                    <Table.Cell class="border border-gray-300 p-2">{teacherRecord.teacher?.user?.firstName ?? ''}</Table.Cell>
                    <Table.Cell class="border border-gray-300 p-2">{teacherRecord.teacher?.user?.middleName ?? ''}</Table.Cell>
                    <Table.Cell class="border border-gray-300 p-2">{teacherRecord.teacher?.user?.lastName ?? ''}</Table.Cell>
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>

    <div class="flex space-x-4 mt-4">
        <a href="./{department.id}/edit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit Department</a>
        <a href="./{department.id}/addTeacher" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add Teachers</a>
    </div>
</main>
