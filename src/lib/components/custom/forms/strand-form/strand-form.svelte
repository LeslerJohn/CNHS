<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { strandFormSchema, type StrandFormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<{ name: string; description: string }>; // Update type

	const form = superForm(data, {
		validators: zodClient(strandFormSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
    <Form.Field {form} name="name">
        <Form.Control let:attrs>
            <Form.Label>Strand Name</Form.Label>
            <Input {...attrs} bind:value={$formData.name} />
        </Form.Control>
        <Form.Description>This is the name of the strand.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>
    
    <Form.Field {form} name="description">
        <Form.Control let:attrs>
            <Form.Label>Description</Form.Label>
            <Input {...attrs} bind:value={$formData.description} />
        </Form.Control>
        <Form.Description>This is a description of the strand.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>
    
    <Form.Button>Create Strand</Form.Button>
</form>