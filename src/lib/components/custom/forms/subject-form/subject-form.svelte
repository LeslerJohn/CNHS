<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { subjectFormSchema, type SubjectFormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<{ name: string; description: string; gradeLevel?: number }>;

	const form = superForm(data, {
		validators: zodClient(subjectFormSchema)
	});

	const { form: formData, enhance } = form;

    function handleGradeLevelInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const value = target.valueAsNumber;
		$formData.gradeLevel = value;
	}
</script>

<form method="POST" use:enhance>
    <Form.Field {form} name="name">
        <Form.Control let:attrs>
            <Form.Label>Subject Name</Form.Label>
            <Input {...attrs} bind:value={$formData.name} />
        </Form.Control>
        <Form.Description>This is the name of the department.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>
    
    <Form.Field {form} name="description">
        <Form.Control let:attrs>
            <Form.Label>Description</Form.Label>
            <Input {...attrs} bind:value={$formData.description} />
        </Form.Control>
        <Form.Description>This is a description of the department.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="gradeLevel">
        <Form.Control let:attrs>
            <Form.Label>Grade Level</Form.Label>
            <Input type="number" {...attrs} bind:value={$formData.gradeLevel}  
            on:input={handleGradeLevelInput} />
        </Form.Control>
        <Form.Description>This is a .</Form.Description>
        <Form.FieldErrors />
    </Form.Field>
    
    <Form.Button>Create Subject</Form.Button>
</form>