<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>



    <h1>System Overview</h1>
    <ul class="count-box">
        <li class="count-card">Total Students: <h2>{data.totalStudents}</h2></li>
        <li class="count-card">Total Teachers: <h2>{data.totalTeachers}</h2></li>
        <li class="count-card">Total Sections: <h2>{data.totalSections}</h2></li>
        <li class="count-card">Total Departments: <h2>{data.totalDepartments}</h2></li>
        <li class="count-card">Total Government Programs: <h2>{data.totalGovernmentPrograms}</h2></li>
        <li class="count-card">Total Subjects: <h2>{data.totalSubjects}</h2></li>
    </ul>


<style>
    h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }

    .count-box {
        display: flex;
        justify-content: start;
        align-items: center;
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 2px solid #000000;
        gap: 20px;
        flex-wrap: wrap;
    }

    .count-card {
        width: 300px;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        text-wrap: none;
    }

    .count-card h2 {
        font-size: 28px;
        font-weight: 600;
        margin-bottom: 0;
    }
</style>