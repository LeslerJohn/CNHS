<script lang="ts">
    import { page } from "$app/stores";
</script>

<aside>
    <nav>
        <ul>
            <li aria-current={$page.url.pathname === '' ? 'page' : undefined}>
                <a href="/admin/dashboard">Dashboard</a>
            </li>
            <li aria-current={$page.url.pathname === '/teacher' ? 'page' : undefined}>
                <a href="/admin/teacher">Teacher</a>
            </li>
            <li aria-current={$page.url.pathname.startsWith('/class') ? 'page' : undefined}>
                <a href="/admin/class">Class</a>
            </li>
            <li aria-current={$page.url.pathname.startsWith('/subject') ? 'page' : undefined}>
                <a href="/admin/subject">Subject</a>
            </li>
            <li aria-current={$page.url.pathname.startsWith('/department') ? 'page' : undefined}>
                <a href="/admin/department">Departments</a>
            </li>
            <li aria-current={$page.url.pathname.startsWith('/governmentProgram') ? 'page' : undefined}>
                <a href="/admin/governmentProgram">Government Program</a>
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
</style>