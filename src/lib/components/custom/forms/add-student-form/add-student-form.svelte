<script lang="ts">
    import { superForm, type SuperValidated } from 'sveltekit-superforms';
    import { addStudentFormSchema } from '$lib/components/custom/forms/add-student-form/schema';
    import * as Form from '$lib/components/ui/form/index.js';
    import * as Popover from '$lib/components/ui/popover/index.js';
    import * as Command from '$lib/components/ui/command/index.js';
    import Check from 'lucide-svelte/icons/check';
    import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
    import { cn } from '$lib/utils.js';
    import { buttonVariants } from '$lib/components/ui/button/index.js';
    import { zodClient } from 'sveltekit-superforms/adapters';

    export let data: SuperValidated<{ programId: number; studentId?: number | null}>;

    const form = superForm(data, {
        validators: zodClient(addStudentFormSchema)
    });

    export let students: { value: number; label: string }[];

    export let program: { id: number; name: string };

    const { form: formData, enhance } = form;

    let open = false;

    function closeAndFocusTrigger(triggerId: string) {
        document.getElementById(triggerId)?.focus();
    }
</script>

<!-- Form Structure -->
<form use:enhance method="POST">
    <!-- program ID Field -->
    <Form.Field {form} name="programId">
        <Form.Control let:attrs>
            <Form.Label>Program: {program.name}</Form.Label>
            <input type="hidden" value={$formData.programId} {...attrs} />
        </Form.Control>
    </Form.Field>

    <!-- student Selection Field -->
    <Form.Field {form} name="studentId" class="flex flex-col">
        <Popover.Root bind:open let:ids>
            <Form.Control let:attrs>
                <Form.Label>Student</Form.Label>
                <Popover.Trigger
                    class={cn(
                        buttonVariants({ variant: 'outline' }),
                        'w-[200px] justify-between',
                        !$formData.studentId && 'text-muted-foreground'
                    )}
                    role="combobox"
                    {...attrs}
                >
                    {students.find(student => student.value === $formData.studentId)?.label ?? 'Select student'}
                    <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Popover.Trigger>
                <input hidden value={$formData.studentId} name={attrs.name} />
            </Form.Control>
            <Popover.Content class="w-[200px] p-0">
                <Command.Root>
                    <Command.Input autofocus placeholder="Search student..." class="h-9" />
                    <Command.Empty>No student found.</Command.Empty>
                    <Command.Group>
                        {#each students as student}
                            <Command.Item
                                value={student.label}
                                onSelect={() => {
                                    $formData.studentId = student.value;
                                    closeAndFocusTrigger(ids.trigger);
                                }}
                            >
                                {student.label}
                                <Check
                                    class={cn(
                                        'ml-auto h-4 w-4',
                                        student.value !== $formData.studentId && 'text-transparent'
                                    )}
                                />
                            </Command.Item>
                        {/each}
                    </Command.Group>
                </Command.Root>
            </Popover.Content>
        </Popover.Root>
    </Form.Field>

    <!-- Submit Button -->
    <Form.Button>Submit</Form.Button>
</form>
