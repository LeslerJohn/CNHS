<script lang="ts">
    import type { PageData } from './$types';
    import { Switch } from "$lib/components/ui/switch";
    import * as Card from "$lib/components/ui/card";
    // Import the PageData type to get the `sections` data
    export let data: PageData;

    // Extract the sections from the data
    const sections = data.sections;

    let searchQuerySection = '';
    let selectedGradeLevel = '';
    let isActive = true;

    $: filteredSections = data.sections.filter(section => {
        return (
            section.name.toLowerCase().startsWith(searchQuerySection.toLowerCase()) &&
            (selectedGradeLevel === '' || section.yearLevel === Number(selectedGradeLevel)) &&
            (isActive ? section.isActive : true)
        );
    });
</script>

<h2 class="text-3xl mb-4">Sections</h2>

<div class="flex flex-col md:flex-row md:items-top md:space-x-4 mb-4">
    <input 
        type="text" 
        placeholder="Search sections..." 
        bind:value={searchQuerySection} 
        class="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
    <select 
        bind:value={selectedGradeLevel} 
        class="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2 md:mt-0"
    >
        <option value="">All Grades</option>
        <option value="7">Grade 7</option>
        <option value="8">Grade 8</option>
        <option value="9">Grade 9</option>
        <option value="10">Grade 10</option>
        <option value="11">Grade 11</option>
        <option value="12">Grade 12</option>
    </select>
    <label for="active-switch" class="flex items-center space-x-2 mt-2 md:mt-0">
        <span>Active:</span>
        <Switch
            id="active-switch"
            includeInput
            bind:checked={isActive}
        />
    </label>
</div>

<ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredSections as section}
        <Card.Root class="w-full h-auto border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <!-- Card Header -->
            <Card.Header class="p-4 bg-gradient-to-r from-purple-500 to-purple-400 text-white">
                <Card.Title class="text-xl font-bold truncate">{section.name}</Card.Title>
                <Card.Description class="text-sm text-white mt-1 italic">
                    Adviser: {section.teacher?.user?.firstName} {section.teacher?.user?.middleName} {section.teacher?.user?.lastName || 'No Adviser Assigned'}
                </Card.Description>
            </Card.Header>

            <!-- Card Content -->
            <Card.Content class="p-6 bg-white">
                <div class="mb-4">
                    <p class="text-sm font-semibold text-gray-600">Year Level</p>
                    <p class="text-lg text-gray-800">{section.yearLevel}</p>
                </div>
                <div class="mb-4">
                    <p class="text-sm font-semibold text-gray-600">School Year</p>
                    <p class="text-lg text-gray-800">{section.startSchoolYear} - {section.startSchoolYear + 1}</p>
                </div>
                <div>
                    <p class="text-sm font-semibold text-gray-600">Room</p>
                    <p class="text-lg text-gray-800">{section.room?.roomNumber || 'No Room Assigned'}</p>
                </div>
            </Card.Content>

            <!-- Card Footer -->
            <Card.Footer class="p-4 bg-gray-100 flex justify-between items-center">
                <a href={`./schedule/${section.id}`} class="text-purple-500 hover:underline font-medium">View Schedule</a>
            </Card.Footer>
        </Card.Root>
    {/each}
</ul>


<!-- {#if sections && sections.length > 0}
    {#each sections as section}
        <div class="section-item bg-white shadow-md rounded-lg p-4 mb-6">
            <h3 class="text-xl font-semibold mb-2">Section: {section.name}</h3>
            <p class="text-gray-700">Year Level: {section.yearLevel}</p>
            <p class="text-gray-700">Room: {section.room?.roomNumber ?? 'N/A'}</p>
            <p class="text-gray-700">
                Adviser: {section.teacher && section.teacher.user ? `${section.teacher.user.firstName} ${section.teacher.user.lastName}` : 'N/A'}
            </p>

            <h4 class="text-lg font-medium mt-4">Subjects:</h4>
            {#if section.subjects && section.subjects.length > 0}
                {#each section.subjects as subjectOnSection}
                    <div class="subject-details bg-gray-100 p-4 mt-2 border border-gray-300 rounded-lg">
                        <p class="text-gray-800">Subject: {subjectOnSection.subject.name}</p>
                        <p class="text-gray-800">
                            Teacher: {subjectOnSection.teacher && subjectOnSection.teacher.user ? `${subjectOnSection.teacher.user.firstName} ${subjectOnSection.teacher.user.lastName}` : 'N/A'}
                        </p>
                        <p class="text-gray-800">
                            Schedule: {subjectOnSection.schedule?.dayOfWeek ?? 'N/A'} - {formatTime(
                                subjectOnSection.schedule?.startTime?.toString() ?? ''
                            )} to {formatTime(subjectOnSection.schedule?.endTime?.toString() ?? '')}
                        </p>
                    </div>
                {/each}
            {:else}
                <p class="text-gray-700">No subjects available for this section.</p>
            {/if}
        </div>
    {/each}
{:else}
    <p class="text-gray-700">No sections found.</p>
{/if} -->
