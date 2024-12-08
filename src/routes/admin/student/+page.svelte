<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

    <h1>Manage Student</h1>
    <button><a href="/teacher/student/new">Add Student</a></button>
    <ul>
        {#each data.students as student}
        <li class="card">
            <a href="./student/{student.id}">{student.fullName}</a>
            <ul>
                <li>ID: {student.lrn}</li>
                <li>Grade Level: {student.gradeLevel}</li>
                <li>Guardian: {student.guardianName}</li>
                <li>Enrollment: {student.enrollmentDate}</li>
                <li>
                    <button>View Grades</button>
                </li>
            </ul>
            <a href="./student/{student.id}/edit">Edit Student</a>
        </li>
        {/each}
    </ul>
<style>
    h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }

    .student-card {
        border: 1px solid black;
        padding: 1rem;
        border-radius: 8px;
        margin: 2rem 0;
    }
</style>