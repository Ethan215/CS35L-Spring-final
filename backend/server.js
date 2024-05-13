require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const profileRoutes = require("./routes/profileRoutes");

//express app
const app = express();

//middleware
app.use(express.json()); //sees if request body if so parses it as json

// TODO: remove, log incoming requests
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// routes:

// route /api/profiles to profileRoutes
app.use("/api/profiles", profileRoutes);

//connect to db
mongoose
	.connect(process.env.MONGO_URI)
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
