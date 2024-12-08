<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { studentFormSchema, type StudentFormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
    import * as Select from '$lib/components/ui/select';

    export let data: SuperValidated<{ firstName: string; middleName?: string; lastName: string; email: string; lrn: string; dateOfBirth: string; gender: string; contactNumber: string; address: string; password: string; guardianName: string, yearLevel: number}>;

	const form = superForm(data, {
		validators: zodClient(studentFormSchema)
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
    
    function handleYearLevelInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const value = target.valueAsNumber;
		$formData.yearLevel = value;
	}

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
    <Form.Field {form} name="firstName">
        <Form.Control let:attrs>
            <Form.Label>First Name</Form.Label>
            <Input {...attrs} bind:value={$formData.firstName} />
        </Form.Control>
        <Form.Description>First name of the student.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="middleName">
        <Form.Control let:attrs>
            <Form.Label>Middle Name</Form.Label>
            <Input {...attrs} bind:value={$formData.middleName} />
        </Form.Control>
        <Form.Description>Middle name of the student.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="lastName">
        <Form.Control let:attrs>
            <Form.Label>Last Name</Form.Label>
            <Input {...attrs} bind:value={$formData.lastName} />
        </Form.Control>
        <Form.Description>Last name of the student.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>
    
    <Form.Field {form} name="email">
        <Form.Control let:attrs>
            <Form.Label>Email</Form.Label>
            <Input {...attrs} bind:value={$formData.email} />
        </Form.Control>
        <Form.Description>Email of the student.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="lrn">
        <Form.Control let:attrs>
            <Form.Label>LRN</Form.Label>
            <Input {...attrs} bind:value={$formData.lrn} />
        </Form.Control>
        <Form.Description>LRN of the student.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="yearLevel">
		<Form.Control let:attrs>
			<Form.Label>Year Level</Form.Label>
			<Input type="number" {...attrs} bind:value={$formData.yearLevel} on:input={handleYearLevelInput}/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

    <Form.Field {form} name="dateOfBirth">
        <Form.Control let:attrs>
            <Form.Label>Date Of Birth</Form.Label>
            <Input type="date" {...attrs} bind:value={$formData.dateOfBirth} />
        </Form.Control>
        <Form.Description>Birth Day of the student.</Form.Description>
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
        <Form.Description>Contact Number of the student.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="address">
        <Form.Control let:attrs>
            <Form.Label>Address</Form.Label>
            <Input {...attrs} bind:value={$formData.address} />
        </Form.Control>
        <Form.Description>Address of the student.</Form.Description>
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

    <Form.Field {form} name="guardianName">
        <Form.Control let:attrs>
            <Form.Label>Guardian Name</Form.Label>
            <Input {...attrs} bind:value={$formData.guardianName} />
        </Form.Control>
        <Form.Description>Guardian Name of the student.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>
    
    <Form.Button>Create Student</Form.Button>
</form>