import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const isCustomAuth = token.length < 500;

		req.userId = "";
		if (token && isCustomAuth) {
			const decode = jwt.verify(token, process.env.JWT_SECRET);
			req.userId = decode._id;
		} else {
			const decode = jwt.decode(token);
			req.userId = decode?.sub;
		}

		if (req.userId === "")
			return res.status(401).json({ error: "Unauthenticated" });

		next();
	} catch (error) {
		res.status(400).json({
			error: {
				message: "something wrong with middleware auth",
				error: error.message,
			},
		});
	}
};
