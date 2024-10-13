<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<h1>Teacher Details</h1>
{#if data.teacher}
    <ul>
        <li>ID: {data.teacher.id}</li>
        <li>Position: {data.teacher.position}</li>
        <li>Employee ID: {data.teacher.employeeId}</li>
        <li>User Info:</li>
        {#if data.teacher.user}
        <ul>
            <li>ID: {data.teacher.user.id}</li>
            <li>First Name: {data.teacher.user.firstName}</li>
            <li>Last Name: {data.teacher.user.lastName}</li>
            <li>Middle Name: {data.teacher.user.middleName}</li>
            <li>Date of Birth: {new Date(data.teacher.user.dateOfBirth).toLocaleDateString()}</li>
            <li>Gender: {data.teacher.user.gender}</li>
            <li>Address: {data.teacher.user.address}</li>
            <li>Contact Number: {data.teacher.user.contactNumber}</li>
            <li>Email: {data.teacher.user.email}</li>
            <li>Password: {data.teacher.user.password}</li>
            <li>Is Admin: {data.teacher.user.isAdmin ? 'Yes' : 'No'}</li>
            <li>Created At: {new Date(data.teacher.user.createdAt).toLocaleString()}</li>
            <li>Updated At: {new Date(data.teacher.user.updatedAt).toLocaleString()}</li>
        </ul>
        {:else}
        <p>No user data available.</p>
        {/if}
    </ul>
    <a href="./{data.teacher.id}/edit">Edit</a>
{:else}
    <p>No teacher data available.</p>
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