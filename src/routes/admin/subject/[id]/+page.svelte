<script lang='ts'>
    import type { PageData } from './$types';

    export let data: PageData;
    
    const { subject } = data;
</script>

<main>
    <h1>Subject Details</h1>
    <p><strong>ID:</strong> {subject.id}</p>
    <p><strong>Name:</strong> {subject.name}</p>
    <p><strong>Description:</strong> {subject.description}</p>
</main>

<style>
    main {
        padding: 1rem;
    }
    h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    p {
        margin: 0.5rem 0;
    }
</style>