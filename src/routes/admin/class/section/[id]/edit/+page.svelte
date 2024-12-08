<script lang="ts">
    import { superForm } from 'sveltekit-superforms';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import { toast } from 'svelte-sonner';
    import { sectionFormSchema } from '$lib/components/custom/forms/section-form/schema';
    import SectionForm from '$lib/components/custom/forms/section-form/section-form.svelte';
	import type { PageData } from './$types';

	export let data: PageData; 

    console.log(data.rooms);
    console.log(data.advisers);
    console.log(data.form);

</script>

<a href="./">Back to class</a>
<SectionForm data={data.form} rooms={data.rooms} advisers={data.advisers} />
