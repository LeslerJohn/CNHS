<script lang="ts">
    import type { PageData } from './$types';
    import * as Card from "$lib/components/ui/card";
    export let data: PageData;

    let searchQueryTeacher = '';

    $: filteredTeachers = data.teachers.filter(teacher => {
        return (
            teacher.fullName.toLowerCase().includes(searchQueryTeacher.toLowerCase())
        );
    });
</script>

    <h1 class="text-3xl my-4">Manage Teacher</h1>
    <div class="flex flex-col md:flex-row md:items-top md:space-x-4 mb-4">
        <input 
            type="text" 
            placeholder="Search teachers..." 
            bind:value={searchQueryTeacher} 
            class="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
        <button class="md:mt-0 bg-red-500 text-white p-2 rounded-md shadow-sm hover:bg-red-600">
            <a href="/admin/teacher/new">Add Teacher</a>
        </button>
    </div>

    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredTeachers as teacher}
            <Card.Root class="w-full h-auto border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                <!-- Card Header -->
                <Card.Header class="p-4 bg-gradient-to-r from-red-500 to-red-400 text-white">
                    <Card.Title class="text-xl font-bold truncate">{teacher.fullName}</Card.Title>
                    <Card.Description class="text-sm text-white mt-1 italic">Active: {teacher.isActive ? 'Yes' : 'No'}</Card.Description>
                </Card.Header>
    
                <!-- Card Content -->
                <Card.Content class="p-6 bg-white">
                    <div>
                        <p class="text-sm font-semibold text-gray-600">Employee ID</p>
                        <p class="text-md text-gray-800">{teacher.employeeId}</p>
                    </div>

                    <div>
                        <p class="mt-2 text-sm font-semibold text-gray-600">Position</p>
                        <p class="text-md text-gray-800">{teacher.position}</p>
                    </div>
                </Card.Content>
    
                <!-- Card Footer -->
                <Card.Footer class="p-4 bg-gray-100 flex justify-between items-center">
                    <a href="./teacher/{teacher.id}" class="text-red-500 hover:underline font-medium">View Details</a>
                    <a href="./teacher/{teacher.id}/edit" class="text-red-500 hover:underline font-medium">Edit Teacher</a>
                </Card.Footer>
            </Card.Root>
        {/each}
    </ul>
    