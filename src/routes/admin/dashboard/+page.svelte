<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<h1 class="text-4xl font-bold mb-8 text-blue-600">System Overview</h1>
<ul class="flex flex-wrap gap-8 pb-8 mb-8 border-b-4 border-blue-300">
    <li class="w-full sm:w-1/2 lg:w-1/3 p-6 bg-blue-100 rounded-lg shadow-lg">
        Total Students: <h2 class="text-3xl font-semibold text-blue-700">{data.totalStudents}</h2>
    </li>
    <li class="w-full sm:w-1/2 lg:w-1/3 p-6 bg-green-100 rounded-lg shadow-lg">
        Total Teachers: <h2 class="text-3xl font-semibold text-green-700">{data.totalTeachers}</h2>
    </li>
    <li class="w-full sm:w-1/2 lg:w-1/3 p-6 bg-yellow-100 rounded-lg shadow-lg">
        Total Sections: <h2 class="text-3xl font-semibold text-yellow-700">{data.totalSections}</h2>
    </li>
    <li class="w-full sm:w-1/2 lg:w-1/3 p-6 bg-red-100 rounded-lg shadow-lg">
        Total Departments: <h2 class="text-3xl font-semibold text-red-700">{data.totalDepartments}</h2>
    </li>
    <li class="w-full sm:w-1/2 lg:w-1/3 p-6 bg-purple-100 rounded-lg shadow-lg">
        Total Government Programs: <h2 class="text-3xl font-semibold text-purple-700">{data.totalGovernmentPrograms}</h2>
    </li>
    <li class="w-full sm:w-1/2 lg:w-1/3 p-6 bg-pink-100 rounded-lg shadow-lg">
        Total Subjects: <h2 class="text-3xl font-semibold text-pink-700">{data.totalSubjects}</h2>
    </li>
</ul>
