const express = require("express");
const router = express.Router();
require('dotenv').config()


router.get("/", async (req, res, next) => {
	return res.status(200).json({
		title: "Express Testing",
		message: "The app is working properly! ))",
		test: process.env.METRO,
		// test2: process.env.FOZZY,
	});
});

module.exports = router;