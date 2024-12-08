<script lang="ts">
    import type { PageData } from './$types';
    import { Separator } from '$lib/components/ui/separator';
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
    import { Badge } from "$lib/components/ui/badge";

    export let data: PageData;

    // Destructure the student data for easier access
    const { advisorySection, teachingDetails, teacher } = data;
</script>

<!-- Teacher Information Section -->
<Card.Root class="p-6 mb-6 shadow-md">
    <Card.Header class="mb-4">
        <Card.Title class="text-2xl font-bold">Teacher Information</Card.Title>
        <Card.Description class="text-gray-600">
            Details about the teacher’s profile and activity.
        </Card.Description>
    </Card.Header>
    <Card.Content>
        <div class="space-y-2 text-gray-700">
            <p><strong>Name:</strong> {teacher?.user?.firstName} {teacher?.user?.lastName}</p>
            <p><strong>Email:</strong> {teacher?.user?.email}</p>
            <p><strong>Employee ID:</strong> {teacher?.employeeId}</p>
            <p><strong>Position:</strong> {teacher?.position}</p>
            <p>
                <strong>Active:</strong>
                <Badge class={teacher?.isActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}>
                    {teacher?.isActive ? 'Yes' : 'No'}
                </Badge>
            </p>
        </div>
    </Card.Content>
</Card.Root>

<!-- Advisory Section -->
{#if advisorySection}
    <Card.Root class="p-6 mb-6 shadow-md">
        <Card.Header class="mb-4">
            <Card.Title class="text-2xl font-bold">
                Advisory Section: {advisorySection.name}
            </Card.Title>
            <Card.Description class="text-gray-600">
                Manage and monitor the students in your advisory section.
            </Card.Description>
        </Card.Header>
        <Card.Content>
            <ul class="space-y-2 list-disc list-inside text-gray-700">
                {#each advisorySection.students as student}
                    <li>
                        {student.student.user.firstName} {student.student.user.lastName} - Grade {student.student.gradeLevel}
                    </li>
                {/each}
            </ul>
        </Card.Content>
        <Card.Footer class="mt-4">
            <Button>
                <a href="./dashboard/{advisorySection.id}">View Advisory Section</a>
            </Button>
        </Card.Footer>
    </Card.Root>
{:else}
    <p class="text-gray-500 mb-6">You are not an adviser for any section.</p>
{/if}

<!-- Sections Teaching -->
<Card.Root class="p-6 shadow-md">
    <Card.Header class="mb-4">
        <Card.Title class="text-2xl font-bold">Sections Teaching</Card.Title>
        <Card.Description class="text-gray-600">
            Overview of the sections and subjects you are teaching.
        </Card.Description>
    </Card.Header>
    <Card.Content>
        {#if teachingDetails.length > 0}
            {#each teachingDetails as section}
                <div class="mb-6">
                    <h3 class="text-xl font-semibold mb-2">
                        <a href="./dashboard/{section.id}" class="hover:underline text-blue-500">
                            Section: {section.name}
                        </a>
                    </h3>
                    <ul class="space-y-2 text-gray-700">
                        {#each section.subjects as subject}
                            <li>
                                <strong>Subject:</strong> {subject.subject.name}
                            </li>
                            {#if subject.schedule}
                                <li>
                                    <strong>Schedule:</strong> {subject.schedule.dayOfWeek}, 
                                    {new Date(subject.schedule.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - 
                                    {new Date(subject.schedule.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </li>
                            {/if}
                        {/each}
                    </ul>
                </div>
                <Separator />
            {/each}
        {:else}
            <p class="text-gray-500">You are not teaching any sections.</p>
        {/if}
    </Card.Content>
</Card.Root>
