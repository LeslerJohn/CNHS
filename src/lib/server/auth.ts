// Modify login function to return user role instead of redirect
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function login(username: any, password: string) {
	console.log('Attempting login for:', username);

	const user = await prisma.user.findFirst({
		where: {
			OR: [
				{ email: username },
				{ Teacher: { employeeId: username } },
				{ Student: { lrn: username } }
			]
		},
		include: {
			Teacher: true,
			Student: true
		}
	});

	if (!user) {
		console.error('User not found');
		throw new Error('Invalid login credentials');
	}
	console.log('User found:', user);

	if (user.password !== password) {
		console.error('Password mismatch');
		throw new Error('Invalid login credentials');
	}

	console.log('Role detected:', user.isAdmin ? 'Admin' : user.Teacher ? 'Teacher' : 'Student');

	if (user.isAdmin) {
		return 'admin';
	} else if (user.Teacher) {
		return 'teacher';
	} else if (user.Student) {
		return 'student';
	}

	throw new Error('Role not found');
}
