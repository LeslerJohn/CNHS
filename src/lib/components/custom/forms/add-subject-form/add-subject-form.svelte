<script lang="ts">
    import { superForm, type SuperValidated } from 'sveltekit-superforms';
    import { addSubjectFormSchema } from '$lib/components/custom/forms/add-subject-form/schema';
    import * as Form from '$lib/components/ui/form/index.js';
    import * as Popover from '$lib/components/ui/popover/index.js';
    import * as Command from '$lib/components/ui/command/index.js';
    import Check from 'lucide-svelte/icons/check';
    import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
    import { cn } from '$lib/utils.js';
    import { buttonVariants } from '$lib/components/ui/button/index.js';
    import { zodClient } from 'sveltekit-superforms/adapters';

    export let data: SuperValidated<{ sectionId: number; subjectId?: number | null}>;

    const form = superForm(data, {
        validators: zodClient(addSubjectFormSchema)
    });

    export let subjects: { value: number; label: string }[];

    export let section: { id: number; name: string };

    const { form: formData, enhance } = form;

    let open = false;

    function closeAndFocusTrigger(triggerId: string) {
        document.getElementById(triggerId)?.focus();
    }
</script>

<!-- Form Structure -->
<form use:enhance method="POST">
    <!-- Section ID Field -->
    <Form.Field {form} name="sectionId">
        <Form.Control let:attrs>
            <Form.Label>Section: {section.name}</Form.Label>
            <input type="hidden" value={$formData.sectionId} {...attrs} />
        </Form.Control>
    </Form.Field>

    <!-- Subject Selection Field -->
    <Form.Field {form} name="subjectId" class="flex flex-col">
        <Popover.Root bind:open let:ids>
            <Form.Control let:attrs>
                <Form.Label>Subject</Form.Label>
                <Popover.Trigger
                    class={cn(
                        buttonVariants({ variant: 'outline' }),
                        'w-[200px] justify-between',
                        !$formData.subjectId && 'text-muted-foreground'
                    )}
                    role="combobox"
                    {...attrs}
                >
                    {subjects.find(subject => subject.value === $formData.subjectId)?.label ?? 'Select subject'}
                    <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Popover.Trigger>
                <input hidden value={$formData.subjectId} name={attrs.name} />
            </Form.Control>
            <Popover.Content class="w-[200px] p-0">
                <Command.Root>
                    <Command.Input autofocus placeholder="Search subject..." class="h-9" />
                    <Command.Empty>No subject found.</Command.Empty>
                    <Command.Group>
                        {#each subjects as subject}
                            <Command.Item
                                value={subject.label}
                                onSelect={() => {
                                    $formData.subjectId = subject.value;
                                    closeAndFocusTrigger(ids.trigger);
                                }}
                            >
                                {subject.label}
                                <Check
                                    class={cn(
                                        'ml-auto h-4 w-4',
                                        subject.value !== $formData.subjectId && 'text-transparent'
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
