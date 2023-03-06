import { z } from 'zod';

export const authFormSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.min(5, { message: 'An email should be minimum of 5 characters' })
		.max(64, { message: 'An email should have less than 64 characters' })
		.trim()
		.email({ message: 'A valid email is required' }),
	password: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'A password should be of 6 to 32 characters' })
		.max(32, { message: 'A password should be of 6 to 32 characters' })
		.trim()
});
