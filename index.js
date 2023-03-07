
const express = require('express');
const app = express()
const Products = require('./Routes/Product.routes');
const PORT = 5000;
app.use(express.json())



app.use('/product', Products)

// start()

app.listen(PORT, () => {
	console.log('server started')
})