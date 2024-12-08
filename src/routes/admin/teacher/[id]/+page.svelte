<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<div class="container mx-auto rounded-lg bg-white p-6 shadow-md">
    <h1 class="mb-5 text-3xl font-bold text-gray-700">Teacher Details</h1>

    {#if data.teacher}
        <!-- Teacher Details Card -->
        <div class="space-y-6">
            <!-- Main Info Section -->
            <div class="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 shadow-sm">
                <h2 class="mb-2 text-xl font-semibold text-gray-700">Teacher Information</h2>
                <div class="grid grid-cols-1 gap-4 text-lg text-gray-600 md:grid-cols-2 lg:grid-cols-3">
                    <div><strong>ID:</strong> {data.teacher.id}</div>
                    <div><strong>Position:</strong> {data.teacher.position}</div>
                    <div><strong>Employee ID:</strong> {data.teacher.employeeId}</div>
                    <div><strong>Active:</strong> {data.teacher.isActive ? 'Yes' : 'No'}</div>
                </div>
            </div>

            <!-- User Info Section -->
            <div class="rounded-lg border-l-4 border-gray-400 bg-gray-50 p-4 shadow-sm">
                <h2 class="mb-2 text-xl font-semibold text-gray-700">User Information</h2>
                {#if data.teacher.user}
                    <div class="grid grid-cols-1 gap-4 text-lg text-gray-600 md:grid-cols-2 lg:grid-cols-3">
                        <div><strong>User ID:</strong> {data.teacher.user.id}</div>
                        <div><strong>First Name:</strong> {data.teacher.user.firstName}</div>
                        <div><strong>Last Name:</strong> {data.teacher.user.lastName}</div>
                        <div><strong>Middle Name:</strong> {data.teacher.user.middleName}</div>
                        <div>
                            <strong>Date of Birth:</strong>
                            {new Date(data.teacher.user.dateOfBirth).toLocaleDateString()}
                        </div>
                        <div><strong>Gender:</strong> {data.teacher.user.gender}</div>
                        <div><strong>Address:</strong> {data.teacher.user.address}</div>
                        <div><strong>Contact:</strong> {data.teacher.user.contactNumber}</div>
                        <div><strong>Email:</strong> {data.teacher.user.email}</div>
                        <div><strong>Admin Status:</strong> {data.teacher.user.isAdmin ? 'Yes' : 'No'}</div>
                        <div>
                            <strong>Created:</strong>
                            {new Date(data.teacher.user.createdAt).toLocaleString()}
                        </div>
                        <div>
                            <strong>Updated:</strong>
                            {new Date(data.teacher.user.updatedAt).toLocaleString()}
                        </div>
                    </div>
                {:else}
                    <p class="mt-2 text-red-500">No user data available.</p>
                {/if}
            </div>

            <!-- Edit Action -->
            <div class="mt-4 flex justify-start">
                <a
                    href="./{data.teacher.id}/edit"
                    class="rounded-md bg-blue-500 px-4 py-2 text-white shadow-md transition hover:bg-blue-600"
                >
                    Edit Teacher Info
                </a>
            </div>
        </div>
    {:else}
        <p class="mt-4 text-center font-semibold text-red-500">No teacher data available.</p>
    {/if}
</div>
