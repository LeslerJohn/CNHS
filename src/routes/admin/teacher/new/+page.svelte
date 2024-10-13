<script lang="ts">
	import type { PageData } from './$types';

	import TeacherForm from '$lib/components/custom/forms/teacher-form/teacher-form.svelte';

	export let data: PageData;
</script>
<h1>Hello</h1>
<TeacherForm data={data.form} departments={data.departments}/>