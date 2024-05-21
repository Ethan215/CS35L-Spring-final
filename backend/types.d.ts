
declare namespace Express {
    // This will add the user object to the Express Request object
	export interface Request {
		user?: { userId: string; username: string, email: string };
	}
}
