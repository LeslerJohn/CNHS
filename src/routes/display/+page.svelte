<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    // console.log('Users received in component:', data);

    $: ({ users } = data);
</script>

{#if users?.length > 0}
    <ul>
        {#each users as user}
            <h1>{user.FirstName}</h1>
            <li>
                <strong>{user.FirstName} {user.LastName}</strong> - {user.UserType}
                
                {#if user.UserType === 'Student' && user.student?.section}
                    <span> - Section: {user.student.section.SectionName}</span>
                {/if}

                {#if user.UserType === 'Teacher' && user.teacher}
                    <span> - {user.teacher.Position} in {user.teacher.Department}</span>

                    {#if user.teacher.AdviserOfSections?.length > 0}
                        <span> - Adviser of Sections:</span>
                        <ul>
                            {#each user.teacher.AdviserOfSections as section}
                                <li>{section.SectionName}</li>
                            {/each}
                        </ul>
                    {/if}
                {/if}
            </li>
        {/each}
        <p>Total users: {users.length}</p>
    </ul>
{:else}
    <p>No users found.</p>
{/if}
