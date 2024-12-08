<script lang="ts">
	import type { PageData } from './$types';
	import StudentToSectionForm from '$lib/components/custom/forms/student-section-form/student-section-form.svelte';

	// export let data: { form: { sectionId: number; }; subjects: { value: number; label: string; }[]; }; 

	export let data: PageData;
</script>

<a href="./">Back</a>
<StudentToSectionForm data={data.form} students={data.students} section={data.section ?? { id: 0, name: '' }}/>
