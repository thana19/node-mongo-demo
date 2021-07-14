const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 9000;

const Product = require('./product')
const products = [{}]

app.use(express.json())

// mongoose.connect('mongodb://usr:secure@127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect('mongodb://usr:secure@mongo/test', { useNewUrlParser: true, useUnifiedTopology: true })

app.get('/', (req, res) => {
  res.json({ message: 'node-mongo-demo!7' })
})

app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

app.get('/products/:id', async (req, res) => {
  const { id } = req.params
  try {
    const product = await Product.findById(id)
    res.json(product)
  } catch (error) {
    res.status(400).json(error)
  }
})

app.get('/products/name/:pname', async (req, res) => {
  const { pname } = req.params
  try {
    const product = await Product.findOne({ name: pname })
    res.json(product)
  } catch (error) {
    res.status(400).json(error)
  }  
})

app.post('/products', async (req, res) => {
  const payload = req.body
  try {
    const product = new Product(payload)
    await product.save()
    res.status(201).end()
  } catch (error) {
    res.status(400).json(error)
  }    
})

app.put('/products/:id', async (req, res) => {
  const payload = req.body
  const { id } = req.params

  try {
    const product = await Product.findByIdAndUpdate(id, { $set: payload })
    res.json(product)
  } catch (error) {
    res.status(400).json(error)
  }
})

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params

  try {
    await Product.findByIdAndDelete(id)
    res.status(204).end()
  } catch (error) {
    res.status(400).json(error)
  }
})

app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`);
})