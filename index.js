import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv/config";

// routes
import postsRouter from "./routes/posts.js";
import userRouter from "./routes/user.js";

// connection settings
const URL_DB = process.env.MONGODB_URI || "mongodb://localhost:27017/memories";
const PORT = process.env.PORT || 3003;

mongoose
	.connect(URL_DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() =>
		app.listen(PORT, () => console.log(`server running on port ${PORT}`))
	)
	.catch(err => console.log(err.message));

//
const app = express();

// middleware
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// routes
app.use("/posts", postsRouter);
app.use("/user", userRouter);

// --------------------------- deployment -------------------------------
const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client", "build")));

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "client", "build", "index.html"));
	});
} else {
	app.get("/", (req, res) => {
		res.send("API is running....");
	});
}
// --------------------------- deployment -------------------------------

// handle error
app.use((req, res) => {
	res.status(404).json({ error: "route invalid" });
});

app.use((error, req, res, next) => {
	res.status(400).json({ error: error });
});
