<script lang="ts">
	import { zodClient } from 'sveltekit-superforms/adapters';
	import SuperDebug, { type SuperValidated, superForm } from 'sveltekit-superforms';
	import { sectionFormSchema } from './schema';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
    import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { Switch } from "$lib/components/ui/switch";

	// Props for form data
	export let data: SuperValidated<{
		name: string;
		yearLevel: number;
		startSchoolYear: number;
		isActive: boolean;
		roomID?: number | null;
		adviserID?: number | null;
	}>;

	// Props for available options
	export let rooms: { id: number; roomNumber: string }[];
	// export let strands: { id: number; name: string }[];
	export let advisers: { id: number; name: string }[];

	// Initialize form
	const form = superForm(data, {
		validators: zodClient(sectionFormSchema)
	});

    function handleYearLevelInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const value = target.valueAsNumber;
		$formData.yearLevel = value;
	}

	function handleSchoolYearInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const value = target.valueAsNumber;
		$formData.startSchoolYear = value;
	}

	const { form: formData, enhance } = form;

	// Reactive variables for selected options
	$: availableRooms = rooms.map(room => ({ value: room.id, label: room.roomNumber }));
	// $: availableStrands = strands.map(strand => ({ value: strand.id, label: strand.name }));
	$: availableAdvisers = advisers.map(adviser => ({ value: adviser.id, label: adviser.name }));

	$: selectedRoom = $formData.roomID
		? availableRooms.find((room) => room.value === $formData.roomID)
		: undefined;
	// $: selectedStrand = $formData.strandID
	// 	? availableStrands.find((strand) => strand.value === $formData.strandID)
	// 	: undefined;
	$: selectedAdviser = $formData.adviserID
		? availableAdvisers.find((adviser) => adviser.value === $formData.adviserID)
		: undefined;

	// Handle yearLevel changes
	// $: strandVisible = $formData.yearLevel >= 11;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Section Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="yearLevel">
		<Form.Control let:attrs>
			<Form.Label>Year Level</Form.Label>
			<Input type="number" {...attrs} bind:value={$formData.yearLevel} on:input={handleYearLevelInput}/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="startSchoolYear">
		<Form.Control let:attrs>
			<Form.Label>School Year Start</Form.Label>
			<Input type="number" {...attrs} bind:value={$formData.startSchoolYear} on:input={handleSchoolYearInput}/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="roomID">
		<Form.Control let:attrs>
			<Form.Label>Select Room</Form.Label>
			<Select.Root
				selected={selectedRoom}
				onSelectedChange={(v) => {
					v && ($formData.roomID = v.value);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select Room" />
				</Select.Trigger>
				<Select.Content>
					{#each availableRooms as room}
						<Select.Item value={room.value} label={room.label} />
					{/each}
				</Select.Content>
			</Select.Root>
			<input hidden bind:value={$formData.roomID} name={attrs.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- {#if strandVisible}
		<Form.Field {form} name="strandID">
			<Form.Control let:attrs>
				<Form.Label>Select Strand</Form.Label>
				<Select.Root
					selected={selectedStrand}
					onSelectedChange={(v) => {
						v && ($formData.strandID = v.value);
					}}
				>
					<Select.Trigger {...attrs}>
						<Select.Value placeholder="Select Strand" />
					</Select.Trigger>
					<Select.Content>
						{#each availableStrands as strand}
							<Select.Item value={strand.value} label={strand.label} />
						{/each}
					</Select.Content>
				</Select.Root>
				<input hidden bind:value={$formData.strandID} name={attrs.name} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	{/if} -->

	<Form.Field {form} name="adviserID">
		<Form.Control let:attrs>
			<Form.Label>Select Adviser</Form.Label>
			<Select.Root
				selected={selectedAdviser}
				onSelectedChange={(v) => {
					v && ($formData.adviserID = v.value);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select Adviser" />
				</Select.Trigger>
				<Select.Content>
					{#each availableAdvisers as adviser}
						<Select.Item value={adviser.value} label={adviser.label} />
					{/each}
				</Select.Content>
			</Select.Root>
			<input hidden bind:value={$formData.adviserID} name={attrs.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field
	{form}
	name="isActive"
	class="flex flex-row items-center justify-between rounded-lg border p-4"
>
	<Form.Control let:attrs>
		<div class="space-y-0.5">
		<Form.Label>Active</Form.Label>
		<Form.Description>
			Is the section currently active.
		</Form.Description>
		</div>
		<Switch
			includeInput
			{...attrs}
			bind:checked={$formData.isActive}
		/>
	</Form.Control>
	</Form.Field>

	<Form.Button>Create Section</Form.Button>
</form>
