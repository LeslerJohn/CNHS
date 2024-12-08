<script lang="ts">
    import type { PageData } from './$types';
    import * as Card from "$lib/components/ui/card";


    export let data: PageData;
    let searchQuery = '';
    let selectedGradeLevel = '';

    $: filteredSubjects = data.subjects.filter(subject => {
        return (
            subject.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedGradeLevel === '' || subject.gradeLevel === Number(selectedGradeLevel))
        );
    });
</script>

<h1 class="text-3xl mb-6">Manage Subject</h1>
<div class="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6">
    <input 
        type="text" 
        placeholder="Search subjects..." 
        bind:value={searchQuery} 
        class="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 md:mb-0"
    />
    <select 
        bind:value={selectedGradeLevel} 
        class="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 md:mb-0"
    >
        <option value="">All Grades</option>
        <option value="7">Grade 7</option>
        <option value="8">Grade 8</option>
        <option value="9">Grade 9</option>
        <option value="10">Grade 10</option>
        <option value="11">Grade 11</option>
        <option value="12">Grade 12</option>
    </select>
    <button class="bg-blue-500 text-white p-2 rounded-md shadow-sm hover:bg-blue-600">
        <a href="/admin/subject/new">Add Subject</a>
    </button>
</div>
<ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredSubjects as subject}
        <Card.Root class="w-full h-auto border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <!-- Card Header -->
            <Card.Header class="p-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white">
                <Card.Title class="text-xl font-bold truncate">{subject.name}</Card.Title>
                <Card.Description class="text-sm text-white mt-1 italic">{subject.description}</Card.Description>
            </Card.Header>

            <!-- Card Content -->
            <Card.Content class="p-6 bg-white">
                <div class="mb-4">
                    <p class="text-sm font-semibold text-gray-600">Grade Level</p>
                    <p class="text-lg text-gray-800">{subject.gradeLevel}</p>
                </div>
                <div class="mb-4">
                    <p class="text-sm font-semibold text-gray-600">Subject Code</p>
                    <p class="text-lg text-gray-800">{subject.id}</p>
                </div>
            </Card.Content>

            <!-- Card Footer -->
            <Card.Footer class="p-4 bg-gray-100 flex justify-between items-center">
                <a href="./subject/{subject.id}" class="text-blue-500 hover:underline font-medium">View Details</a>
                <a href="./subject/{subject.id}/edit" class="text-blue-500 hover:underline font-medium">Edit</a>
            </Card.Footer>
        </Card.Root>
    {/each}
</ul>

