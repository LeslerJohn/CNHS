<script>
    export let id
</script>

<section {id}>
    <div class="flex flex-col flex-1 max-w-[1400px] mx-auto w-full">
        <slot />
    </div>
</section>

<style>
    section {
        padding: 30px;
        margin-left: 300px;
    }
</style>