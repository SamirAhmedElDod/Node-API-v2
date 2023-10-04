const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');

// Get All Product
const getProducts = asyncHandler(async (req, res) => {
  try {
    const prodcuts = await Product.find({});
    res.status(200).json(prodcuts);
  } catch (error) {
    res.status(500)
    throw new Error(error.message);
  }
})

// Get A single Product
const getProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const prodcut = await Product.findById(id);
    res.status(200).json(prodcut);
  } catch (error) {
    res.status(500)
    throw new Error(error.message);
  }
})

// create a product
const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500)
    throw new Error(error.message);
  }
})

// update a product
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      //cannot find
      res.status(404)
      throw new Error(`cannot find any product with ID ${id}`);
    }
    const updatedproduct = await Product.findByIdAndUpdate(id);
    res.status(200).json(updatedproduct);
  } catch (error) {
    res.status(500)
    throw new Error(error.message);
  }
})


// Delete A Product 
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404)
      throw new Error(`cannot find any product with ID ${id}`);
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500)
    throw new Error(error.message);
  }
})

module.exports =  {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}