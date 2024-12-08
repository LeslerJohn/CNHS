<script lang="ts">
    import type { PageData } from './$types';
    import * as Card from "$lib/components/ui/card";
    import { Separator } from "$lib/components/ui/separator";
    import { Badge } from "$lib/components/ui/badge";

    export let data: PageData;

    // Destructure the student data for easier access
    const { user, sections, governmentPrograms } = data.student;
</script>

<div class="student-profile space-y-6">
    <!-- Personal Information -->
    <Card.Root class="shadow-md">
        <Card.Header>
            <h2 class="text-2xl font-bold">Personal Information</h2>
        </Card.Header>
        <Card.Content>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><strong>First Name:</strong> {user.firstName}</p>
                <p><strong>Last Name:</strong> {user.lastName}</p>
                <p><strong>Middle Name:</strong> {user.middleName || 'N/A'}</p>
                <p><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
                <p><strong>Gender:</strong> {user.gender}</p>
                <p><strong>Address:</strong> {user.address}</p>
                <p><strong>Contact Number:</strong> {user.contactNumber}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
        </Card.Content>
    </Card.Root>

    <!-- Student Information -->
    <Card.Root class="shadow-md">
        <Card.Header>
            <h2 class="text-2xl font-bold">Student Information</h2>
        </Card.Header>
        <Card.Content>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><strong>Guardian Name:</strong> {data.student.guardianName || 'N/A'}</p>
                <p><strong>Enrollment Date:</strong> {new Date(data.student.enrollmentDate).toLocaleDateString()}</p>
                <p><strong>LRN:</strong> {data.student.lrn}</p>
            </div>
        </Card.Content>
    </Card.Root>

    <!-- Section Details -->
    {#if sections.length > 0}
        {#each sections.filter(section => section.section.isActive).sort((a, b) => b.section.startSchoolYear - a.section.startSchoolYear).slice(0, 1) as section}
        <Card.Root class="shadow-md">
            <Card.Header>
                <h2 class="text-2xl font-bold">Current Section Details</h2>
            </Card.Header>
            <Card.Content>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p><strong>Section Name:</strong> {section.section.name}</p>
                    <p><strong>Year Level:</strong> {section.section.yearLevel}</p>
                    <p><strong>Adviser:</strong> 
                        {section.section.teacher?.user?.firstName} {section.section.teacher?.user?.lastName || ''}
                    </p>
                    <p><strong>Room:</strong> {section.section.room?.roomNumber || 'N/A'} 
                        ({section.section.room?.building || 'No building specified'})
                    </p>
                    <p><strong>School Year:</strong> {section.section.startSchoolYear} - {section.section.startSchoolYear + 1}</p>
                </div>
            </Card.Content>
        </Card.Root>
        {/each}
    {/if}
<!-- Government Programs -->
<Card.Root class="shadow-md">
    <Card.Header>
        <h2 class="text-2xl font-bold">Government Programs</h2>
    </Card.Header>
    <Card.Content>
        {#if governmentPrograms.length > 0}
            <ul class="space-y-2">
                {#each governmentPrograms as { governmentProgram }}
                <li class="flex items-center space-x-2">
                    <span class="font-semibold">{governmentProgram.name}</span>
                    <span class="text-gray-600">- {governmentProgram.description || 'No description'}</span>
                </li>
                {/each}
            </ul>
        {:else}
            <p>No government programs enrolled.</p>
        {/if}
    </Card.Content>
</Card.Root>
</div>

<style>
    .student-profile {
        padding: 20px;
    }

    h2 {
        margin-bottom: 10px;
    }
</style>
