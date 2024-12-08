<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container mx-auto rounded-md bg-white p-6 shadow-md">
	<!-- Header -->
	<h1 class="mb-4 text-2xl font-semibold">Student Details</h1>

	{#if data.student}
		<!-- User Info Section -->
		<div class="user-info mb-4 rounded-md border bg-gray-50 p-4 shadow-sm">
			<h2 class="mb-2 text-lg font-bold">User Information</h2>
			{#if data.student.user}
				<ul class="space-y-2">
					<li><strong>First Name:</strong> {data.student.user.firstName}</li>
					<li><strong>Last Name:</strong> {data.student.user.lastName}</li>
					<li><strong>Middle Name:</strong> {data.student.user.middleName || 'N/A'}</li>
					<li>
						<strong>Date of Birth:</strong>
						{new Date(data.student.user.dateOfBirth).toLocaleDateString()}
					</li>
					<li><strong>Gender:</strong> {data.student.user.gender}</li>
					<li><strong>Address:</strong> {data.student.user.address}</li>
					<li><strong>Contact Number:</strong> {data.student.user.contactNumber}</li>
					<li><strong>Email:</strong> {data.student.user.email}</li>
				</ul>
			{:else}
				<p class="text-gray-600">No user data available.</p>
			{/if}
		</div>

		<!-- Section Info Section -->
		<div class="section-info mb-4 rounded-md border bg-gray-50 p-4 shadow-sm">
			<h2 class="mb-2 text-lg font-bold">Section Information</h2>
			{#if data.student.sections && data.student.sections.length > 0}
				<ul class="space-y-2">
					{#each data.student.sections as section}
						<li>
							<strong>Section ID:</strong>
							{section.section?.id || 'N/A'} |
							<strong>Section Name:</strong>
							{section.section?.name || 'N/A'}
						</li>
					{/each}
				</ul>
			{:else}
				<p class="text-gray-600">No section data available.</p>
			{/if}
		</div>

		<!-- Edit Button Section -->
		<div class="edit-btn-container mt-8 flex justify-start">
			<a
				href="./{data.student.id}/edit"
				class="rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
			>
				Edit Details
			</a>
		</div>
	{:else}
		<p class="text-gray-600">No student data available.</p>
	{/if}
</div>

<style>
	/* General Styles */
	h1 {
		font-size: 24px;
		margin-bottom: 1rem;
	}

	/* Cards */
	.user-info,
	.section-info {
		max-width: 800px;
		padding: 1rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	/* Buttons */
	a:hover {
		transition: background-color 0.2s ease;
	}

	/* Spacing */
	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		margin-bottom: 0.5rem;
	}
</style>
