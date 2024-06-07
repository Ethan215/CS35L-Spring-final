import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import mongoose from "mongoose";

//CORS
import cors from "cors";

// cookie parser middleware
import cookieParser from "cookie-parser";

import profileRoutes from "./src/routes/profileRoutes";
import messageRoutes from './src/routes/messageRoutes';
import userRoutes from "./src/routes/userRoutes";
import friendRoutes from "./src/routes/friendRoutes";
import postRoutes from "./src/routes/postRoutes";

//express app
const app = express();


//middleware

// CORS
app.use(cors());

app.use(express.json()); //sees if request body if so parses it as json

//cookie parser
app.use(cookieParser());

// For monitoring, log incoming requests
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
	console.log(req.path, req.method);
	next();
});

// routes:

// route /api/user to userRoutes
app.use("/api/user", userRoutes);

// route /api/profiles to profileRoutes
app.use("/api/profiles", profileRoutes);

// route /api/messages to messageRoutes
app.use('/api/messages', messageRoutes);

// route /api/friends to friendRoutes
app.use("/api/friends", friendRoutes);

// route /api/posts to postRoutes
app.use("/api/posts", postRoutes);

// for debugging, log mongo uri
// console.log(process.env.MONGO_URI);

//connect to db
mongoose
	.connect(process.env.MONGO_URI!)
	.then(() => {
		console.log("Successfully connected to DB");

		//listen for requests
		app.listen(process.env.PORT, () => {
			console.log(`listening for requests on port ${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
