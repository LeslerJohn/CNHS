<script lang="ts">
	import ProgramForm from '$lib/components/custom/forms/program-form/program-form.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<ProgramForm data={data.form}/>