<script lang="ts">
	import type { PageData } from './$types';

	import SubjectForm  from '$lib/components/custom/forms/subject-form/subject-form.svelte';

	export let data: PageData;

	
</script>

<a href="../">Back to subjects</a>
<SubjectForm data={data.form} />