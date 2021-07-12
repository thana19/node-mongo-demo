const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 9000;

const Product = require('./product')
const products = [{}]

app.use(express.json())

// mongoose.connect('mongodb://usr:52435243@157.230.254.37:2888/test', { useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.connect('mongodb://usr:secure@127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect('mongodb://usr:secure@mongo/test', { useNewUrlParser: true, useUnifiedTopology: true })

app.get('/', (req, res) => {
  res.json({ message: 'wrk-mongodb!' })
})

app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`);
})