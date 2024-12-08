<script lang='ts'>
    export let students: { id: string; name: string }[] = [];
    export let subjectId = '';

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const grades = students.map(student => ({
            studentId: student.id,
            grade: formData.get(`grade-${student.id}`)
        }));
        console.log({ subjectId, grades });
        // You can add your form submission logic here
    }
</script>

<form on:submit={handleSubmit}>
    <h2>Add Grades for Subject: {subjectId}</h2>
    {#each students as student}
        <div>
            <label for="grade-{student.id}">{student.name}</label>
            <input type="number" id="grade-{student.id}" name="grade-{student.id}" min="0" max="100" required />
        </div>
    {/each}
    <button type="submit">Submit Grades</button>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
    }
    div {
        margin-bottom: 1rem;
    }
    label {
        margin-right: 1rem;
    }
</style>