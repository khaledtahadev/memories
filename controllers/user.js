import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
	const infoUser = req.body;
	/*  
		check if user is exists
		check if is correct user by compare password
		assign token to user 
	*/
	try {
		const user = await User.findOne({ email: infoUser.email }, "-__v")
			.lean()
			.exec();

		if (!user) return res.status(404).json({ error: "User doesn't exist" });

		const isCorrect = await bcryptjs.compare(infoUser.password, user.password);
		if (!isCorrect) return res.status(400).json({ error: "inValid password" });

		const token = jwt.sign(
			{ email: user.email, _id: user._id },
			process.env.JWT_SECRET,
			{
				expiresIn: "1h",
			}
		);

		delete user.password;
		res.json({ userInfo: user, token });
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: error.message });
	}
};

export const signUp = async (req, res) => {
	const { email, password, firstName, lastName } = req.body;
	/* 
		check if user is not exists
		hashed password
		adding to database
		assign token
	 */
	try {
		const user = await User.findOne({ email }).lean().exec();
		if (user) return res.status(400).json({ error: "user is already exists" });

		const hashedPassword = await bcryptjs.hash(password, 10);

		const newUser = await User.create({
			email,
			password: hashedPassword,
			name: `${firstName} ${lastName}`,
		});

		const token = jwt.sign(
			{ email, _id: newUser._id },
			process.env.JWT_SECRET,
			{
				expiresIn: "1h",
			}
		);

		res.json({ userInfo: newUser.toJSON(), token });
	} catch (error) {
		console.log(error);
		res.json({ error: error.message });
	}
};
