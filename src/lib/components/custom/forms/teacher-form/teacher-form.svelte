<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { teacherFormSchema, type TeacherFormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
    import * as Select from '$lib/components/ui/select';
    import { Switch } from "$lib/components/ui/switch";

    export let data: SuperValidated<{ firstName: string; middleName?: string; lastName: string; email: string; employeeId: string; dateOfBirth: string; gender: string; contactNumber: string; address: string; password: string; position?: string, departments?: Array<number>; isActive: boolean}>;

	const form = superForm(data, {
		validators: zodClient(teacherFormSchema)
	});

    $: selectedGender = $formData.gender
    ? {
        value: $formData.gender,
        label: $formData.gender
    }
    : undefined;
    
    const genders = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
    ];

	export let departments: { id: number; name: string }[];

	const { form: formData, enhance } = form;

	$: availableDepartments = departments.map(dept => ({ value: dept.id, label: dept.name }));

    // Reactive variable for selected departments (multi-select)
    $: selectedDepartments = $formData.departments
        ?.map((deptId) => availableDepartments.find((dept) => dept.value === deptId))
        .filter((dept) => dept !== undefined);
</script>

<form method="POST" use:enhance>
    <Form.Field {form} name="firstName">
        <Form.Control let:attrs>
            <Form.Label>First Name</Form.Label>
            <Input {...attrs} bind:value={$formData.firstName} />
        </Form.Control>
        <Form.Description>First name of the teacher.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="middleName">
        <Form.Control let:attrs>
            <Form.Label>Middle Name</Form.Label>
            <Input {...attrs} bind:value={$formData.middleName} />
        </Form.Control>
        <Form.Description>Middle name of the teacher.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="lastName">
        <Form.Control let:attrs>
            <Form.Label>Last Name</Form.Label>
            <Input {...attrs} bind:value={$formData.lastName} />
        </Form.Control>
        <Form.Description>Last name of the teacher.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>
    
    <Form.Field {form} name="email">
        <Form.Control let:attrs>
            <Form.Label>Email</Form.Label>
            <Input {...attrs} bind:value={$formData.email} />
        </Form.Control>
        <Form.Description>Email of the teacher.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="employeeId">
        <Form.Control let:attrs>
            <Form.Label>Employee ID</Form.Label>
            <Input {...attrs} bind:value={$formData.employeeId} />
        </Form.Control>
        <Form.Description>Employee ID of the teacher.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="dateOfBirth">
        <Form.Control let:attrs>
            <Form.Label>Date Of Birth</Form.Label>
            <Input type="date" {...attrs} bind:value={$formData.dateOfBirth} />
        </Form.Control>
        <Form.Description>Birth Day of the teacher.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="gender">
        <Form.Control let:attrs>
            <Form.Label>Gender</Form.Label>
            <Select.Root
                selected={selectedGender}
                onSelectedChange={(v) => {
                v && ($formData.gender = v.value);
                }}
            >
            <Select.Trigger {...attrs}>
                <Select.Value placeholder="Select Gender" />
            </Select.Trigger>
            <Select.Content>
                {#each genders as gen}
                <Select.Item value={gen.value} label={gen.label} />
                {/each}
            </Select.Content>
            </Select.Root>
            <input hidden bind:value={$formData.gender} name={attrs.name} />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="contactNumber">
        <Form.Control let:attrs>
            <Form.Label>Contact Number</Form.Label>
            <Input {...attrs} bind:value={$formData.contactNumber} />
        </Form.Control>
        <Form.Description>Contact Number of the teacher.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="address">
        <Form.Control let:attrs>
            <Form.Label>Address</Form.Label>
            <Input {...attrs} bind:value={$formData.address} />
        </Form.Control>
        <Form.Description>Address of the teacher.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="password">
        <Form.Control let:attrs>
            <Form.Label>Password</Form.Label>
            <Input type="password" {...attrs} bind:value={$formData.password} />
        </Form.Control>
        <Form.Description>This is a .</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="position">
        <Form.Control let:attrs>
            <Form.Label>Position</Form.Label>
            <Input {...attrs} bind:value={$formData.position} />
        </Form.Control>
        <Form.Description>Position of the teacher.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="departments">
		<Form.Control let:attrs>
			<Form.Label>Select Departments</Form.Label>
			<Select.Root
				selected={selectedDepartments}
				multiple={true}
				onSelectedChange={(v) => {
					$formData.departments = v ? v.map((item) => item.value) : [];
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select Departments" />
				</Select.Trigger>
				<Select.Content>
					{#each availableDepartments as dept}
						<Select.Item value={dept.value} label={dept.label} />
					{/each}
				</Select.Content>
			</Select.Root>
			<input hidden bind:value={$formData.departments} name={attrs.name} />
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
                Is the tacher currently active.
            </Form.Description>
            </div>
            <Switch
                includeInput
                {...attrs}
                bind:checked={$formData.isActive}
            />
        </Form.Control>
        </Form.Field>
    <Form.Button>Create Teacher</Form.Button>
</form>