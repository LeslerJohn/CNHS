<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>
    <h1>Manage Rooms</h1>
    <button><a href="/admin/room/new">Add Room</a></button>
    <ul>
        {#each data.rooms as room}
            <li><a href="./{room.id}">{room.roomNumber}</a></li>
            <li>{room.building}</li>
            <li>{room.capacity}</li>
            <a href="./room/{room.id}/edit">Edit Room</a>
        {/each}
    </ul>

<style>
    h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }
</style>