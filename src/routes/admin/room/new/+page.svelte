<script lang="ts">
	import type { PageData } from './$types';

	import RoomForm from '$lib/components/custom/forms/room-form/room-form.svelte';

	export let data: PageData;
</script>

<RoomForm data={data.form} />