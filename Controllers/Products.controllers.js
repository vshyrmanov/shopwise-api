// const puppeteer = require("puppeteer");
require('dotenv').config()
// const chromium = require('chrome-aws-lambda');

let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
	// running on the Vercel platform.
	chrome = require('chrome-aws-lambda');
	puppeteer = require('puppeteer-core');
} else {
	// running locally.
	puppeteer = require('puppeteer');
}

// const getNovus = async function (search) {
// 	const browser = await puppeteer.launch( {headless: true} );
// 	const page = await browser.newPage();
// 	await page.goto(`${process.env.NOVUS}${search}`)
// 	const data = await page.evaluate(function () {
// 		const events = document.querySelectorAll(".catalog-products__item")
// 		const array = [];
// 		for (let x = 0; x < events.length; x++) {
// 			const test = events[x].innerText.split(/\r?\n/).filter(Boolean);
// 			if (test.length === 3) {
// 				array.push({
// 						price: test[2],
// 						title: test[0],
// 						owner: "Novus",
// 						available: true,
// 				})
// 			}
// 			if (test.length === 6) {
// 				array.push({
// 						price: test[5],
// 						oldPrice: test[3],
// 						discount: test[4],
// 						title: test[1],
// 						owner: "Novus",
// 						available: true,
// 				})
// 			}
// 		}
//
// 		return array;
// 	})
// 	return data
// }

// const getFozzy = async function (search) {
// 	const browser = await puppeteer.launch( {headless: true} );
// 	const page = await browser.newPage();
// 	await page.goto(`${process.env.FOZZY}${search}`)
// 	const data = await page.evaluate(function () {
// 		const events = document.querySelectorAll(".product-description")
// 		const array = [];
// 		for (let x = 0; x < events.length; x++) {
// 			const test = events[x].innerText.split(/\r?\n/);
// 			if (test.length === 5) {
// 				array.push({
// 						price: test[2],
// 						title: test[0].replace(/"/g, ""),
// 						owner: "Fozzy",
// 						available: true,
// 				})
// 			}
// 			if (test.length === 4) {
// 				array.push({
// 						price: test[2],
// 						title: test[0].replace(/"/g, ""),
// 						oldPrice: test[1],
// 						discount: test[3],
// 						owner: "Fozzy",
// 						available: true,
// 				})
// 			}
// 		}
// 		return array;
// 	})
// 	return data
// }

const getMetro = async function (search) {
	let options = {}
	if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
		console.log("IN LAMBDA")
		options = {
			args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
			defaultViewport: chrome.defaultViewport,
			executablePath: await chrome.executablePath,
			headless: true,
			ignoreHTTPSErrors: true,
		}
	} else {
		options = {headless: true}
	}
	// const browser = await chromium.puppeteer.launch({
	// 	args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
	// 	defaultViewport: chromium.defaultViewport,
	// 	executablePath: await chromium.executablePath,
	// 	headless: true,
	// 	ignoreHTTPSErrors: true,
	// })
	const browser = await puppeteer.launch(options);
	// const browser = await puppeteer.launch( {headless: true} );
	let page = await browser.newPage();
	await page.goto(`https://www.google.com/`)
	return await page.title();
	// const page = await browser.newPage();
	// await page.goto(`https://metro.zakaz.ua/uk/search/?q=${search}`)
	// const data = await page.evaluate(function () {
	// 	const events = document.querySelectorAll(".ProductTile__details")
	// 	const array = [];
	// 	for (let x = 0; x < events.length; x++) {
	// 		const test = events[x].innerText.split(/\r?\n/)
	// 		if (test.includes("Немає в наявності")) {
	// 			array.push({
	// 				price: test[1],
	// 				available: false,
	// 				title: test[1],
	// 				owner: "Metro"
	// 			})
	// 			break;
	// 		}
	// 		if (test.length === 3) {
	// 			array.push({
	// 					price: test[0],
	// 					title: test[1],
	// 					owner: "Metro",
	// 					available: true,
	// 			})
	// 		}
	// 		if (test.length === 4) {
	// 			array.push({
	// 					price: test[0],
	// 					discount: test[1],
	// 					title: test[2],
	// 					owner: "Metro",
	// 					available: true,
	// 			})
	// 		}
	// 	}
	//
	// 	return array;
	// })
	// return data
};

// const generateList = async (search) => {
// 	// const dataFozzy = await getFozzy(search);
// 	const dataMetro = await getMetro(search);
// 	// const dataNovus = await getNovus(search);
// 	const unionArray = {
// 		result: [
// 			// ...dataFozzy,
// 			...dataMetro,
// 			// ...dataNovus
// 		]
// 	};
// 	return unionArray;
// }

const controller = {
	search: async (req, res) => {
		try {
			const { search } = req.body;
			const dataMetro = await getMetro();
			// const result = await generateList(search)
			res.json(dataMetro)
		} catch (e) {
			res.json({error: e});
		}
	},
}

module.exports = controller;