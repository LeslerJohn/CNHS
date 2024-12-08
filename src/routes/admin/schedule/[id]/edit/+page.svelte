<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import AddScheduleForm from '$lib/components/custom/forms/add-schedule-form/add-schedule-form.svelte';

	// export let data: { form: { departmentId: number; }; subjects: { value: number; label: string; }[]; }; 

	export let data: PageData;
</script>

<AddScheduleForm data={data.form} teachers={data.teachers} />
