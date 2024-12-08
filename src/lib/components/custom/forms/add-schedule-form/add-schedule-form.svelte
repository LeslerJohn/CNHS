<script lang="ts">
	import SuperDebug, { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { addScheduleFormSchema } from '$lib/components/custom/forms/add-schedule-form/schema';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Command from '$lib/components/ui/command/index.js';
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import { cn } from '$lib/utils.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Button } from '$lib/components/ui/button/index.js';
	import { tick } from 'svelte';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Input } from '$lib/components/ui/input';

	const dayOfWeek = [
		{
			id: 'Monday',
			label: 'Monday'
		},
		{
			id: 'Tuesday',
			label: 'Tuesday'
		},
		{
			id: 'Wednesday',
			label: 'Wednesday'
		},
		{
			id: 'Thursday',
			label: 'Thursday'
		},
		{
			id: 'Friday',
			label: 'Friday'
		}
	] as const;

	export let data: SuperValidated<{
		subjectOnSectionId: number;
		teacherId?: number | null;
		dayOfWeek: Array<string>;
		startTime: string;
		endTime: string;
	}>;

    if (data.data.dayOfWeek.length === 1 && typeof data.data.dayOfWeek[0] === 'string') {
		data.data.dayOfWeek = data.data.dayOfWeek[0].split(','); // Split the single string into an array of days
	} else if (data.data.dayOfWeek.length === 0) {
        data.data.dayOfWeek = [];
    }

// Fix start and end times from ISO strings into proper HH:MM
if (data.data.startTime) {
	data.data.startTime = new Date(data.data.startTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}
if (data.data.endTime) {
	data.data.endTime = new Date(data.data.endTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

	console.log(data);


	const form = superForm(data, {
		validators: zodClient(addScheduleFormSchema)
	});

	export let teachers: { value: number; label: string }[];

	const { form: formData, enhance } = form;

	function addDay(id: string) {
		$formData.dayOfWeek = [...$formData.dayOfWeek, id];
	}

	function removeDay(id: string) {
		$formData.dayOfWeek = $formData.dayOfWeek.filter((i) => i !== id);
	}

	let open = false;

	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<!-- Form Structure -->
<SuperDebug {data} />
<form use:enhance method="POST">
	<!-- Section ID Field -->
	<Form.Fieldset {form} name="dayOfWeek" class="space-y-0">
		<div class="mb-4">
			<Form.Legend class="text-base">Day of Week</Form.Legend>
			<Form.Description
				>Select the days of the week you want to add into the schedule.</Form.Description
			>
		</div>
		<div class="space-y-2">
			{#each dayOfWeek as day}
				{@const checked = $formData.dayOfWeek.includes(day.id)}
				<div class="dayOfWeek-start flex flex-row space-x-3">
					<Form.Control let:attrs>
						<Checkbox
							{...attrs}
							{checked}
							onCheckedChange={(v) => {
								if (v) {
									addDay(day.id);
								} else {
									removeDay(day.id);
								}
							}}
						/>
						<Form.Label class="font-normal">
							{day.label}
						</Form.Label>
						<input hidden type="checkbox" name={attrs.name} value={day.id} {checked} />
					</Form.Control>
				</div>
			{/each}
			<Form.FieldErrors />
		</div>
	</Form.Fieldset>

	<Form.Field {form} name="startTime">
		<Form.Control let:attrs>
			<Form.Label>Start Time</Form.Label>
			<Input {...attrs} type="time" bind:value={$formData.startTime} />
		</Form.Control>
		<Form.Description>This is the start time of the class.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="endTime">
		<Form.Control let:attrs>
			<Form.Label>Start Time</Form.Label>
			<Input {...attrs} type="time" bind:value={$formData.endTime} />
		</Form.Control>
		<Form.Description>This is the end time of the class.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="teacherId" class="flex flex-col">
		<Popover.Root bind:open let:ids>
			<Form.Control let:attrs>
				<Form.Label>Teacher</Form.Label>
				<Popover.Trigger
					class={cn(
						buttonVariants({ variant: 'outline' }),
						'w-[200px] justify-between',
						!$formData.teacherId && 'text-muted-foreground'
					)}
					role="combobox"
					{...attrs}
				>
					{teachers.find((f) => f.value === $formData.teacherId)?.label ?? 'Select teacher'}
					<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Popover.Trigger>
				<input hidden value={$formData.teacherId} name={attrs.name} />
			</Form.Control>
			<Popover.Content class="w-[200px] p-0">
				<Command.Root>
					<Command.Input autofocus placeholder="Search teacher..." class="h-9" />
					<Command.Empty>No teacher found.</Command.Empty>
					<Command.Group>
						{#each teachers as teacher}
							<Command.Item
								value={teacher.label}
								onSelect={() => {
									$formData.teacherId = teacher.value;
									closeAndFocusTrigger(ids.trigger);
								}}
							>
								{teacher.label}
								<Check
									class={cn(
										'ml-auto h-4 w-4',
										teacher.value !== $formData.teacherId && 'text-transparent'
									)}
								/>
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>
		<Form.Description>This is the teacher that will teaching that subject..</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Submit Button -->
	<Form.Button>Submit</Form.Button>
</form>
