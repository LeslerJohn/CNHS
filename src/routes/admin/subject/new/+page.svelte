<script lang="ts">
	import type { PageData } from './$types';

	import SubjectForm from '$lib/components/custom/forms/subject-form/subject-form.svelte';

	export let data: PageData;
</script>
<h1>Hello</h1>
<SubjectForm data={data.form} />