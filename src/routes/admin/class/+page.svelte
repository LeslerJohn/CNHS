<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    let searchQuerySection = '';
    let selectedGradeLevel = '';

    $: filteredSections = data.sections.filter((section) => {
        return (
            section.name.toLowerCase().startsWith(searchQuerySection.toLowerCase()) &&
            (selectedGradeLevel === '' || section.yearLevel === Number(selectedGradeLevel))
        );
    });
</script>

<h1>Manage Classes</h1>
<h2 class="text-xl mb-2">Sections</h2>
<div class="md:items-top mb-4 flex flex-col md:flex-row md:space-x-4">
    <input
        type="text"
        placeholder="Search sections..."
        bind:value={searchQuerySection}
        class="rounded-md border border-gray-300 p-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <select
        bind:value={selectedGradeLevel}
        class="mt-2 rounded-md border border-gray-300 p-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 md:mt-0"
    >
        <option value="">All Grades</option>
        <option value="7">Grade 7</option>
        <option value="8">Grade 8</option>
        <option value="9">Grade 9</option>
        <option value="10">Grade 10</option>
        <option value="11">Grade 11</option>
        <option value="12">Grade 12</option>
    </select>
    <button class="rounded-md bg-blue-500 p-2 text-white shadow-sm hover:bg-blue-600 md:mt-0">
        <a href="/admin/class/section/new">Add Section</a>
    </button>
</div>
<ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {#each filteredSections as section}
        <!-- Section Card Component -->
        <div class="rounded-lg border border-gray-200 bg-white shadow-lg transition-shadow hover:shadow-xl">
            <!-- Card Header -->
            <div class="p-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-t-lg">
                <h2 class="text-lg font-semibold text-gray-100 truncate">{section.name}</h2>
            </div>

            <!-- Card Content -->
            <div class="p-4 bg-white text-sm text-gray-700">
                <div class="mb-2">
                    <p><strong>Active:</strong> {section.isActive ? 'Yes' : 'No'}</p>
                </div>
                <div class="mb-2">
                    <p><strong>Section Level:</strong> {section.yearLevel}</p>
                </div>
                <div class="mb-2">
                    <p>
                        <strong>School Year:</strong> {section.startSchoolYear} - {section.startSchoolYear + 1}
                    </p>
                </div>
                {#if section.room}
                    <div class="mb-2">
                        <p><strong>Room Number:</strong> {section.room.roomNumber}</p>
                    </div>
                {/if}
                {#if section.teacher && section.teacher.user}
                    <div class="mb-2">
                        <p><strong>Adviser:</strong> {section.teacher.user.firstName} {section.teacher.user.lastName}</p>
                    </div>
                {/if}
            </div>

            <!-- Card Footer -->
            <div class="p-3 bg-gray-100 rounded-b-lg flex justify-between items-center">
                <a href="./class/section/{section.id}" class="text-blue-500 hover:text-blue-600 hover:underline">View Details</a>
                <a href="./class/section/{section.id}/edit" class="text-blue-500 hover:text-blue-600 hover:underline">Edit Section</a>
            </div>
        </div>
    {/each}
</ul>

<style>
    h1 {
        font-size: 32px; /* Increased font size */
        margin-bottom: 20px;
    }

    h2 {
        font-size: 24px; /* Increased font size */
    }

    ul {
        border-top: 2px solid black;
        padding-top: 20px;
    }

    p {
        font-size: 16px; /* Increased font size */
    }

    input, select, button {
        font-size: 16px; /* Increased font size */
    }
</style>
