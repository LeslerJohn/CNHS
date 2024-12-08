<script lang="ts">
	import type { PageData } from './$types';
	import AddSubjectForm from '$lib/components/custom/forms/add-subject-form/add-subject-form.svelte';

	// export let data: { form: { sectionId: number; }; subjects: { value: number; label: string; }[]; }; 

	export let data: PageData;

    console.log(data.form);
	console.log(data.subjects);
</script>

<a href="./">Back</a>
<AddSubjectForm data={data.form} subjects={data.subjects} section={data.section ?? { id: 0, name: '' }}/>
