<script lang="ts">
	import type { PageData } from './$types';

	import StrandForm  from '$lib/components/custom/forms/strand-form/strand-form.svelte';

	export let data: PageData;
</script>

<a href="./">Back to class</a>
<StrandForm data={data.form} />