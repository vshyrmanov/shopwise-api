require('dotenv').config()
const express = require('express');
const app = express()
const cors = require('cors');
const Products = require('./Routes/Product.routes');
const home = require('./home');

const PORT = process.env.PORT || 80;
app.use(express.json());
app.use(cors());

app.use('/product', Products);
app.use('/home', home);

// start()

app.listen(PORT, () => {
	console.log('server started')
})