<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { roomFormSchema, type RoomFormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<{ roomNumber: string; building: string; capacity: number }>; // Update type

	const form = superForm(data, {
		validators: zodClient(roomFormSchema)
	});

	const { form: formData, enhance } = form;

    function handleCapacityInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const value = target.valueAsNumber;
		$formData.capacity = value;
	}
</script>

<form method="POST" use:enhance>
    <Form.Field {form} name="roomNumber">
        <Form.Control let:attrs>
            <Form.Label>Room Number</Form.Label>
            <Input {...attrs} bind:value={$formData.roomNumber} />
        </Form.Control>
        <Form.Description>This is the name of the room.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>
    
    <Form.Field {form} name="building">
        <Form.Control let:attrs>
            <Form.Label>Building</Form.Label>
            <Input {...attrs} bind:value={$formData.building} />
        </Form.Control>
        <Form.Description>This is a description of the room.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="capacity">
        <Form.Control let:attrs>
            <Form.Label>Capacity</Form.Label>
            <Input type="number" {...attrs} bind:value={$formData.capacity}  
            on:input={handleCapacityInput} />
        </Form.Control>
        <Form.Description>This is a .</Form.Description>
        <Form.FieldErrors />
    </Form.Field>
    
    <Form.Button>Create Room</Form.Button>
</form>