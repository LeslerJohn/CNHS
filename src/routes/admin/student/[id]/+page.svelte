<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<h1>Student Details</h1>
{#if data.student}
    <ul>
        <li>User Info:</li>
        {#if data.student.user}
        <ul>
            <li>ID: {data.student.user.id}</li>
            <li>First Name: {data.student.user.firstName}</li>
            <li>Last Name: {data.student.user.lastName}</li>
            <li>Middle Name: {data.student.user.middleName}</li>
            <li>Date of Birth: {new Date(data.student.user.dateOfBirth).toLocaleDateString()}</li>
            <li>Gender: {data.student.user.gender}</li>
            <li>Address: {data.student.user.address}</li>
            <li>Contact Number: {data.student.user.contactNumber}</li>
            <li>Email: {data.student.user.email}</li>
            <li>Password: {data.student.user.password}</li>
            <li>Is Admin: {data.student.user.isAdmin ? 'Yes' : 'No'}</li>
            <li>Created At: {new Date(data.student.user.createdAt).toLocaleString()}</li>
            <li>Updated At: {new Date(data.student.user.updatedAt).toLocaleString()}</li>
        </ul>
        {:else}
        <p>No user data available.</p>
        {/if}
        <li>Section Info:</li>
        {#if data.student.section}
        <ul>
            <li>Section ID: {data.student.section.id}</li>
            <li>Section Name: {data.student.section.name}</li>
        </ul>
        {:else}
        <p>No section data available.</p>
        {/if}
    </ul>
    <a href="./{data.student.id}/edit">Edit</a>
{:else}
    <p>No student data available.</p>
{/if}


<style>
    h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        margin-bottom: 10px;
    }
</style>