<script lang="ts">
	import type { PageData } from './$types';
	import AddStudentForm from '$lib/components/custom/forms/add-student-form/add-student-form.svelte';

	// export let data: { form: { programId: number; }; subjects: { value: number; label: string; }[]; }; 

	export let data: PageData;
</script>

<a href="./">Back</a>
<AddStudentForm data={data.form} students={data.students} program={data.program ?? { id: 0, name: '' }}/>
