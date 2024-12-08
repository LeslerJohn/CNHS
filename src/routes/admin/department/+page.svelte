<script lang="ts">
	import type { PageData } from './$types';
    import * as Card from "$lib/components/ui/card";

	export let data: PageData;

    let searchQueryDepartment = '';

    $: filteredDepartments = data.departments.filter(department => {
        return (
            department.name.toLowerCase().includes(searchQueryDepartment.toLowerCase())
        );
    });
</script>
    <h1 class="text-3xl">Manage Department</h1>
    <div class="flex flex-col md:flex-row md:items-top md:space-x-4 mb-4">
        <input 
            type="text" 
            placeholder="Search departments..." 
            bind:value={searchQueryDepartment} 
            class="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button class="md:mt-0 bg-green-500 text-white p-2 rounded-md shadow-sm hover:bg-green-600">
            <a href="/admin/department/new">Add Department</a>
        </button>
    </div>
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredDepartments as department}
            <Card.Root class="w-full h-auto border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                <!-- Card Header -->
                <Card.Header class="p-4 bg-gradient-to-r from-green-500 to-green-400 text-white">
                    <Card.Title class="text-xl font-bold truncate">{department.name}</Card.Title>
                    <Card.Description class="text-sm text-white mt-1 italic">{department.description}</Card.Description>
                </Card.Header>
    
                <!-- Card Content -->
                <Card.Content class="p-6 bg-white">
                    <div class="mb-4">
                        <p class="text-sm font-semibold text-gray-600">Head</p>
                        <p class="text-lg text-gray-800">No Head Assigned</p>
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-gray-600">Number of Teachers</p>
                        <p class="text-lg text-gray-800">{department._count.teachers || '0'}</p>
                    </div>
                </Card.Content>
    
                <!-- Card Footer -->
                <Card.Footer class="p-4 bg-gray-100 flex justify-between items-center">
                    <a href="./department/{department.id}" class="text-green-500 hover:underline font-medium">View Details</a>
                    <a href="./department/{department.id}/edit" class="text-green-500 hover:underline font-medium">Edit Department</a>
                </Card.Footer>
            </Card.Root>
        {/each}
    </ul>
    

<style>
    h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }
</style>