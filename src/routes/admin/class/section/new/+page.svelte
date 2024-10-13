<script lang="ts">
	import type { PageData } from './$types';
	import SectionForm from '$lib/components/custom/forms/section-form/section-form.svelte';

	export let data: PageData;
</script>

<SectionForm data={data.form} rooms={data.rooms} strands={data.strands} advisers={data.advisers} />
