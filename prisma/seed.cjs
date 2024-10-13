const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
	// Create admin user
	const admin = await prisma.user.upsert({
		where: { email: 'admin@school.com' },
		update: {},
		create: {
			email: 'admin@school.com',
			password: 'securePassword', // Make sure to hash this in production
			firstName: 'Admin',
			lastName: 'User',
			gender: 'Male',
			dateOfBirth: new Date('1980-01-01'),
			address: '123 Admin St',
			contactNumber: '1234567890',
			isAdmin: true
		}
	});

	// Create teacher
	const teacher = await prisma.teacher.create({
		data: {
			employeeId: 'T12345',
			department: 'Science',
			position: 'Head Teacher',
			user: {
				create: {
					email: 'teacher@school.com',
					password: 'securePassword', // Make sure to hash this in production
					firstName: 'John',
					lastName: 'Doe',
					gender: 'Male',
					dateOfBirth: new Date('1990-05-15'),
					address: '456 Teacher Rd',
					contactNumber: '0987654321'
				}
			}
		}
	});

	// Create strand
	const strand = await prisma.strand.create({
		data: {
			strandName: 'STEM',
			description: 'Science, Technology, Engineering, and Math'
		}
	});

	// Create room
	const room = await prisma.room.create({
		data: {
			roomNumber: '101',
			building: 'Main Building',
			capacity: 40
		}
	});

	// Create section
	const section = await prisma.section.create({
		data: {
			sectionName: 'Grade 12 - A',
			yearLevel: 12,
			strandID: strand.id,
			roomID: room.id,
			adviserID: teacher.id
		}
	});

	// Create student
	const student = await prisma.student.create({
		data: {
			lrn: 'L123456789',
			guardianName: 'Jane Doe',
			section: {
				connect: { id: section.id } // Connect to the existing section by its ID
			},
			strand: {
				connect: { id: strand.id } // Connect to the existing strand by its ID
			},
			user: {
				create: {
					email: 'student@school.com',
					password: 'securePassword', // Ensure this is hashed in production
					firstName: 'Mary',
					lastName: 'Smith',
					gender: 'Female',
					dateOfBirth: new Date('2005-02-20T00:00:00.000Z'),
					address: '789 Student Ave',
					contactNumber: '1112223333'
				}
			}
		}
	});

	// Create subject
	const subject = await prisma.subject.create({
		data: {
			name: 'Mathematics',
			description: 'Grade 12 Mathematics',
			gradeLevel: 12
		}
	});

	// Create schedule for section
	const schedule = await prisma.schedule.create({
		data: {
			subjectID: subject.id,
			teacherID: teacher.id,
			sectionID: section.id,
			dayOfWeek: 'Monday',
			startTime: new Date('2023-09-25T08:00:00.000Z'),
			endTime: new Date('2023-09-25T09:30:00.000Z')
		}
	});

	// Create grade for student in subject
	const grade = await prisma.grade.create({
		data: {
			studentID: student.id,
			subjectID: subject.id,
			term: '1st Semester',
			grade: 90.5,
			remarks: 'Excellent'
		}
	});

	console.log({ admin, teacher, strand, room, section, student, subject, schedule, grade });
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
