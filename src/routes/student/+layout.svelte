<script lang="ts">
    import { page } from "$app/stores";

    export let id;
</script>

<aside>
    <nav>
        <ul>
            <li aria-current={$page.url.pathname === '' ? 'page' : undefined}>
                <a href="/student/profile">Profile</a>
            </li>
            <li aria-current={$page.url.pathname === '/grades' ? 'page' : undefined}>
                <a href="/student/grades">Grades</a>
            </li>
            <li aria-current={$page.url.pathname.startsWith('/schedule') ? 'page' : undefined}>
                <a href="/student/schedule">Schedule</a>
            </li>
            <li aria-current={$page.url.pathname.startsWith('/subjects') ? 'page' : undefined}>
                <a href="/student/subjects">Subjects</a>
            </li>
            <li aria-current={$page.url.pathname.startsWith('/sport') ? 'page' : undefined}>
                <a href="/student/sport">Sport</a>
            </li>
        </ul>
    </nav>
    <div>
        <ul>
            <li>
                <a href="/">Help</a>
            </li>
            <li>
                <a href="/">Logout</a>
            </li>
        </ul>
    </div>
</aside>

<section {id} >
    <div class="flex flex-col flex-1 max-w-[1400px] mx-auto w-full">
        <slot />
    </div>
</section>

<style>
        aside {
        position: fixed;
        top: 0;
        left: 0;
        width: 250px;
        height: 80dvh;
        background-color: #f1f1f1;
        padding: 20px;
        z-index: 1;
        margin-top: 100px;
        margin-left: 50px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    aside nav ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    aside nav ul li {
        margin-bottom: 20px;
    }

    aside nav ul li a {
        color: #333;
        text-decoration: none;
    }
    
    aside div {
        margin-top: auto;
        display: flex;
        justify-content: space-between;
    }

    aside div ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    aside div ul li {
        margin-top: 10px;
    }

    section {
        padding: 30px;
        margin-left: 300px;
    }
</style>