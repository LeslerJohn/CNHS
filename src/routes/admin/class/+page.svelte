<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

    <h1>Manage Department</h1>
    <h2>Sections</h2>
    <button><a href="/admin/class/section/new">Add Section</a></button>
    <ul>
        {#each data.sections as section}
            <li>
                <a href="./{section.id}">Name: {section.name}</a>
            </li>
            <li>Section Level: {section.yearLevel}</li>
            {#if section.strand}
                <li>Strand: {section.strand.name}</li>
            {/if}
            {#if section.room}
                <li>Room Number: {section.room.roomNumber}</li>
            {/if}
            {#if section.teacher && section.teacher.user}
                <li>Adviser: {section.teacher.user.firstName} {section.teacher.user.lastName}</li>
            {/if}
            <li>
                <a href="./class/section/{section.id}/edit">Edit Section</a>
            </li>
        {/each}
    </ul>
    <hr>
    <h2>Strands</h2>
    <button><a href="/admin/class/strand/new">Add Strand</a></button>
    <ul>
        {#each data.strands as strand}
            <li><a href="./{strand.id}">{strand.name}</a></li>
            <li>{strand.description}</li>
            <a href="./class/strand/{strand.id}">Edit Strand</a>
        {/each}
    </ul>

<style>
    h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }

    ul {
        border-top: 2px solid black;
        border-bottom: 2px solid black;
    }
</style>