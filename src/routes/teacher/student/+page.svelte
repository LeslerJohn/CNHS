<script lang="ts">
    import type { PageData } from './$types';
    import * as Table from "$lib/components/ui/table/index.js";
    export let data: PageData;

    let searchQueryStudent = '';
    let selectedGradeLevel = '';

    $: filteredStudents = data.students.filter(student => {
        return (
            (student.fullName.toLowerCase().includes(searchQueryStudent.toLowerCase()) || student.lrn.toLowerCase().includes(searchQueryStudent.toLowerCase())) && (selectedGradeLevel === '' || student.gradeLevel === Number(selectedGradeLevel))
        );
    });
</script>

    <h1>Manage Student</h1>
    <div class="flex flex-col md:flex-row md:items-top md:space-x-4 mb-4">
        <input 
            type="text" 
            placeholder="Search subjects..." 
            bind:value={searchQueryStudent} 
            class="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select 
            bind:value={selectedGradeLevel} 
            class="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2 md:mt-0"
        >
            <option value="">All Grades</option>
            <option value="7">Grade 7</option>
            <option value="8">Grade 8</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
        </select>
        <button class="md:mt-0 bg-blue-500 text-white p-2 rounded-md shadow-sm hover:bg-blue-600">
            <a href="/teacher/student/new">Add Student</a>
        </button>
    </div>
    <Table.Root class="w-full border border-gray-300 rounded-lg overflow-hidden">
        <!-- Table Caption -->
        <Table.Caption class="text-lg font-semibold mb-4">Student List</Table.Caption>
    
        <!-- Table Header -->
        <Table.Header class="bg-gray-100">
            <Table.Row>
                <Table.Head class="border border-gray-300 px-4 py-2">Name</Table.Head>
                <Table.Head class="border border-gray-300 px-4 py-2">LRN</Table.Head>
                <Table.Head class="border border-gray-300 px-4 py-2">Grade Level</Table.Head>
                <Table.Head class="border border-gray-300 px-4 py-2">Guardian</Table.Head>
                <Table.Head class="border border-gray-300 px-4 py-2">Enrollment Date</Table.Head>
                <Table.Head class="border border-gray-300 px-4 py-2 text-center">Actions</Table.Head>
            </Table.Row>
        </Table.Header>
    
        <!-- Table Body -->
        <Table.Body>
            {#each filteredStudents as student}
            <Table.Row class="hover:bg-gray-50">
                <!-- Name -->
                <Table.Cell class="border border-gray-300 px-4 py-2 font-medium text-blue-600">
                    <a href="./student/{student.id}" class="hover:underline">{student.fullName}</a>
                </Table.Cell>
    
                <!-- LRN -->
                <Table.Cell class="border border-gray-300 px-4 py-2">{student.lrn}</Table.Cell>
    
                <!-- Grade Level -->
                <Table.Cell class="border border-gray-300 px-4 py-2">{student.gradeLevel}</Table.Cell>
    
                <!-- Guardian -->
                <Table.Cell class="border border-gray-300 px-4 py-2">{student.guardianName}</Table.Cell>
    
                <!-- Enrollment Date -->
                <Table.Cell class="border border-gray-300 px-4 py-2">
                    {new Date(student.enrollmentDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </Table.Cell>
    
                <!-- Actions -->
                <Table.Cell class="border border-gray-300 px-4 py-2 text-center">
                    <div class="flex justify-center space-x-3">
                        <a 
                            href="./student/{student.id}/grades" 
                            class="text-blue-500 hover:text-blue-700 font-medium">
                            View Grades
                        </a>
                        <a 
                            href="./student/{student.id}/edit" 
                            class="text-green-500 hover:text-green-700 font-medium">
                            Edit
                        </a>
                    </div>
                </Table.Cell>
            </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
    
<style>
    h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }
</style>