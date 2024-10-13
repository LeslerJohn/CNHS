<script lang="ts">
	import type { PageData } from './$types';

	import DepartmentForm  from '$lib/components/custom/forms/department-form/department-form.svelte';

	export let data: PageData;
</script>

<a href="../">Back to departments</a>
<DepartmentForm data={data.form} />