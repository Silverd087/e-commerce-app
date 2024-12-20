const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products && products.length > 0) {
      res.status(200).json({ products: products });
    } else {
      res.status(404).json({ msg: "No products found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "error on getting products" });
  }
};

const getOneProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const foundProduct = await Product.findById(id);
    if (foundProduct) {
      res.status(200).json({ product: foundProduct });
    } else {
      res.status(404).json({ msg: "No product found with the given ID" });
    }
  } catch (error) {
    res.status(500).json({ msg: "error on retrieving the product" });
  }
};

const postProduct = async (req, res) => {
  const product = req.body;
  console.log("Received product data:", product);
  try {
    const foundProduct = await Product.findOne({ name: product.name });
    if (foundProduct) {
      res.status(400).json({ msg: "Product already exists" });
    } else {
      const newProduct = new Product(product);
      await newProduct.save();
      res
        .status(200)
        .json({ product: newProduct, msg: "Product successfully added" });
    }
  } catch (error) {
    console.error("Error adding product:", error); // Log the error
    res.status(500).json({ msg: "Error on adding the product" });
  }
};

const putProduct = async (req, res) => {
  const id = req.params.id;
  const product = req.body;
  console.log(product);
  try {
    await Product.findByIdAndUpdate(id, product);
    res.status(200).json({ msg: "update success" });
  } catch (error) {
    res.status(500).json({ msg: "error on updating the product" });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ msg: "delete done" });
  } catch (error) {
    res.status(500).json({ msg: "error on deleting the product" });
  }
};

const updateProductStockAndSold = async (req, res) => {
  const id = req.params.id;
  const { stock, sold } = req.body; // Expecting stock and sold in the request body

  // Log the received values to verify
  console.log("Received stock and sold:", stock, sold);

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { stock, sold },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res
      .status(200)
      .json({ msg: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  getProducts,
  getOneProduct,
  postProduct,
  putProduct,
  deleteProduct,
  updateProductStockAndSold,
};
