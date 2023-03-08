require('dotenv').config()
const express = require('express');
const app = express()
const cors = require('cors');
const Products = require('./Routes/Product.routes');
const home = require('./home');

const PORT = process.env.PORT || 80;
app.use(express.json());
app.use(cors());

// app.use('/product', Products);
app.use('/home', home);

let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
	chrome = require("chrome-aws-lambda");
	puppeteer = require("puppeteer-core");
} else {
	puppeteer = require("puppeteer");
}

app.get("/api", async (req, res) => {
	let options = {};

	if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
		options = {
			args: [...chrome.args, "--hide-scrollbars", "--disable-web-security", '--no-sandbox', '--disable-setuid-sandbox'],
			defaultViewport: chrome.defaultViewport,
			executablePath: await chrome.executablePath,
			headless: true,
			ignoreHTTPSErrors: true,
		};
	}

	try {
		let browser = await puppeteer.launch(options);

		let page = await browser.newPage();
		await page.goto("https://www.google.com");
		res.send(await page.title());
	} catch (err) {
		console.error(err);
		return null;
	}
});

// start()

app.listen(PORT, () => {
	console.log('server started')
})