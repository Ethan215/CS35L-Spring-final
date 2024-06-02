import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import mongoose from "mongoose";

//CORS
import cors from "cors";

import profileRoutes from "./src/routes/profileRoutes";
import inviteRoutes from './src/routes/inviteRoutes';

//express app
const app = express();

// CORS
app.use(cors());

//middleware
app.use(express.json()); //sees if request body if so parses it as json

// TODO: remove, log incoming requests
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
	console.log(req.path, req.method);
	next();
});

// routes:

// route /api/profiles to profileRoutes
app.use("/api/profiles", profileRoutes);

// route /api/invites to inviteRoutes
app.use('/api/invites', inviteRoutes);

// log mongo uri
console.log(process.env.MONGO_URI);

//connect to db
mongoose
	.connect(process.env.MONGO_URI!)
	.then(() => {
		console.log("connected to db");

		//listen for requests
		app.listen(process.env.PORT, () => {
			console.log(`listening for requests on port ${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
