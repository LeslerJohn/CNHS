<script lang="ts">
	import type { PageData } from './$types';

	import StudentForm  from '$lib/components/custom/forms/student-form/student-form.svelte';

	export let data: PageData;

</script>

<a href="../">Back to subjects</a>

{#if data.data}
    <StudentForm data={data.data} sections={data.sections}/>
{/if}
