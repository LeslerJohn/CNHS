<script lang="ts">
	import type { PageData } from './$types';
    import * as Card from "$lib/components/ui/card";
	export let data: PageData;

	// Function to format ISO strings into 12-hour format safely
	function formatTime(isoString: string): string {
		const date = new Date(isoString); // Parse ISO strings into valid Date objects
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const period = hours >= 12 ? 'PM' : 'AM';
		const formattedHours = hours % 12 || 12; // Handle edge case for 0 hours as 12

		return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
	}
</script>

<h1 class="mb-6 text-2xl font-bold text-gray-800">
	{data.sectionDetails?.name} - Subjects
</h1>

{#if data.sectionDetails}
	<ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each data.sectionDetails.subjects as subjectDetail}
			<!-- Card Component -->
			<div class="bg-white rounded-lg border border-gray-200 shadow-lg p-4 hover:shadow-xl transition-shadow">
				<!-- Subject Name -->
				<div class="mb-4">
					<h2 class="text-lg font-semibold text-gray-900">
						{subjectDetail.subject.name}
					</h2>
				</div>

				<!-- Teacher Info -->
				<div class="mb-2 text-gray-700">
					<span class="font-semibold">Teacher:</span>
					{subjectDetail.teacher && subjectDetail.teacher.user
						? `${subjectDetail.teacher.user.firstName} ${subjectDetail.teacher.user.lastName}`
						: 'TBA'}
				</div>

				<!-- Schedule -->
				<div class="mb-4 text-gray-700">
					<span class="font-semibold">Schedule:</span>
					{subjectDetail.schedule
						? `${
								Array.isArray(subjectDetail.schedule.dayOfWeek)
									? subjectDetail.schedule.dayOfWeek.join(', ')
									: subjectDetail.schedule.dayOfWeek
							}, 
                            ${formatTime(subjectDetail.schedule.startTime.toISOString())} - 
                            ${formatTime(subjectDetail.schedule.endTime.toISOString())}`
						: 'No Schedule'}
				</div>

				<!-- Actions -->
				<div class="flex justify-between">
					{#if subjectDetail.schedule}
						<a
							href="./{subjectDetail.id}/edit"
							class="text-blue-500 hover:text-blue-600 font-medium hover:underline"
						>
							Edit Schedule
						</a>
						<a
							href="./{subjectDetail.id}/delete"
							class="text-red-500 hover:text-red-600 font-medium hover:underline"
						>
							Delete
						</a>
					{:else}
						<a
							href="./{subjectDetail.id}/add"
							class="text-green-500 hover:text-green-600 font-medium hover:underline"
						>
							Add Schedule
						</a>
					{/if}
				</div>
			</div>
		{/each}
	</ul>
{/if}