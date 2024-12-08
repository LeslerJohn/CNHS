<script lang="ts">
	import type { PageData } from './$types';
	import AddTeacherForm from '$lib/components/custom/forms/add-teacher-form/add-teacher-form.svelte';

	// export let data: { form: { departmentId: number; }; subjects: { value: number; label: string; }[]; }; 

	export let data: PageData;
</script>

<a href="./">Back</a>
<AddTeacherForm data={data.form} teachers={data.teachers} department={data.department ?? { id: 0, name: '' }}/>
