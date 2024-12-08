<script lang='ts'>
    import type { PageData } from './$types';

    export let data: PageData;

    const { section, students } = data;
</script>

<main>
    {#if section}
        <h1 class="text-2xl font-semibold mb-4">Students in Section: {section.name}</h1>
    {:else}
        <h1 class="text-2xl font-semibold mb-4 text-red-500">Section not found</h1>
    {/if}

    {#if students && students.length > 0}
        <!-- Table to Display Students -->
        <div class="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
            <table class="w-full table-auto border-collapse border border-gray-300">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="border border-gray-300 px-4 py-2">LRN</th>
                        <th class="border border-gray-300 px-4 py-2">First Name</th>
                        <th class="border border-gray-300 px-4 py-2">Middle Name</th>
                        <th class="border border-gray-300 px-4 py-2">Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {#each students as studentEntry}
                        <tr class="odd:bg-gray-50 even:bg-white border-t border-gray-300">
                            <td class="border border-gray-300 px-4 py-2">
                                {studentEntry.student.lrn ?? 'N/A'}
                            </td>
                            <td class="border border-gray-300 px-4 py-2">
                                {studentEntry.student?.user?.firstName ?? 'N/A'}
                            </td>
                            <td class="border border-gray-300 px-4 py-2">
                                {studentEntry.student?.user?.middleName ?? '-'}
                            </td>
                            <td class="border border-gray-300 px-4 py-2">
                                {studentEntry.student?.user?.lastName ?? 'N/A'}
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {:else}
        <div class="p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm">
            <p class="text-gray-500">No students found in this section.</p>
        </div>
    {/if}

    <!-- Action Buttons -->
    <div class="flex space-x-4 mt-4">
        {#if section}
            <a href="./" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Back</a>
            <a href="./addStudent" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Add Student</a>
        {/if}
    </div>
</main>

<style>
    main {
        padding: 1em;
    }
</style>
