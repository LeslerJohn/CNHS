<script lang="ts">
	import type { PageData } from './$types';

	import StrandForm from '$lib/components/custom/forms/strand-form/strand-form.svelte';

	export let data: PageData;
</script>
<h1>Hello</h1>
<StrandForm data={data.form} />