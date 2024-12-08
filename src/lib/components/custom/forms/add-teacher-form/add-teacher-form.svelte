<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { addTeacherFormSchema } from '$lib/components/custom/forms/add-teacher-form/schema';
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

	export let data: SuperValidated<{ departmentId: number; teacherId?: number | null }>;

	const form = superForm(data, {
		validators: zodClient(addTeacherFormSchema)
	});

	export let teachers: { value: number; label: string }[];

	export let department: { id: number; name: string };

	const { form: formData, enhance } = form;

	let open = false;
	let selectedValues: string[] = []; // Array to hold multiple selected values

	$: selectedLabels =
		selectedValues.length > 0
			? selectedValues
					.map((value) => teachers.find((f) => f.value === Number(value))?.label)
					.join(', ')
			: 'Select teachers...';

	// Toggle teacher selection
	function toggleSelection(value: string) {
		if (selectedValues.includes(value)) {
			selectedValues = selectedValues.filter((val) => val !== value);
		} else {
			selectedValues.push(value);
		}
	}

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<!-- Form Structure -->
<form use:enhance method="POST">
	<!-- Section ID Field -->
	<Form.Field {form} name="departmentId">
		<Form.Control let:attrs>
			<Form.Label>Department: {department.name}</Form.Label>
			<input type="hidden" value={$formData.departmentId} {...attrs} />
		</Form.Control>
	</Form.Field>

	<!-- <Form.Field {form} name="teacherId" class="flex flex-col">
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
					{teachers.find((teacher) => teacher.value === $formData.teacherId)?.label ??
						'Select teacher'}
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
	</Form.Field> -->

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
		<Form.Description>This is the teacher that will be used in the dashboard.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Submit Button -->
	<Form.Button>Submit</Form.Button>
</form>
