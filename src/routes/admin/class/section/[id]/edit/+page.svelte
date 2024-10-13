<script lang="ts">
    import { superForm } from 'sveltekit-superforms';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import { toast } from 'svelte-sonner';
    import { sectionFormSchema } from '$lib/components/custom/forms/section-form/schema';
    import SectionForm from '$lib/components/custom/forms/section-form/section-form.svelte';
	import type { PageData } from './$types.js';

	export let data: PageData; 

</script>

<a href="./">Back to class</a>
<SectionForm data={data.form} rooms={data.rooms} strands={data.strands} advisers={data.advisers} />
