<script lang="ts">
	import type { PageData } from './$types';

	import TeacherForm from '$lib/components/custom/forms/teacher-form/teacher-form.svelte';

	export let data: PageData;
</script>

<TeacherForm data={data.form} departments={data.departments}/>