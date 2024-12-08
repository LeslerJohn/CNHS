<script lang="ts">
	import type { PageData } from './$types';

	import TeacherForm  from '$lib/components/custom/forms/teacher-form/teacher-form.svelte';

	export let data: PageData;
</script>

<a href="../">Back to subjects</a>
<TeacherForm data={data.data} departments={data.departments} />