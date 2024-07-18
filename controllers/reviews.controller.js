const ProductReview = require("../models/product-review.model");
const _ = require("lodash");
const extend = require("lodash/extend");
const errorHandler = require("../helpers/dbErrorHandler");
const debug = require("debug")("reviews:review.controller.js");

//create a new product-review in the database as a product-review object
const create = async (req, res) => {
  if (!_.isObject(req.body))
    return res.status(400).json({ error: "Invalid product Review data." });

  const productReview = new ProductReview(req.body);
  console.log("in create", req.body);
  try {
    await productReview.save();
    return res.status(200).json({
      message: "Successfully created Product!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err), //Returns the error message from the error object using the getErrorMessage() method from the dbErrorHandler.js helper for any database-related errors that might occur when saving the product-review to the database.
    });
  }
};

const list = async (req, res) => {
  const { limit = 10, skip = 0 } = req.query; // Set default values for limit and skip

  const filter = {}; // Optional filter object for specific criteria

  const count = await ProductReview.countDocuments(filter); // Get total count first

  const productReviews = await ProductReview.find(filter)
    .limit(limit * 1) // Ensure limit is a number
    .skip(skip * 1) // Ensure skip is a number
    .sort({ createdAt: -1 }); // Sort by creation date in descending order (latest first)

  res.status(200).json({
    count,
    productReviews,
  });
};

//find a productReview in the database by its id and store it in the request object as a product-review object,it executes fetch and loads before passing control to the next function thats specific to the request that came in
const productReviewByID = async (req, res, next, id) => {
  console.log("Fetching Product-review by ID: ", id);
  try {
    let productReview = await ProductReview.findById(id);
    if (!productReview) {
      return res.status(400).json({
        error: "Product Review not found",
      });
    }
    req.review = productReview;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve Product Review",
    });
  }
};

//read a product-review from the database as a product-review object
const read = async (req, res) => {
  console.log("in read", req.body);
  req.review.updatedAt = undefined;
  req.review.createdAt = undefined;
  return res.json(req.review);
};

//update a product-review in the database as a product-review object with the new information
const update = async (req, res) => {
  console.log("in update", req.body);
  try {
    let productReview = req.review;
    productReview = extend(productReview, req.body); //extend - Mutates the first object by copying the properties of the second object to it. It returns the mutated object.
    // productReview.updatedAt = Date.now();
    await productReview.save();
    res.json(productReview);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

//delete a product- review from the database
const remove = async (req, res) => {
  console.log("in remove", req.body);
  try {
    let productReview = req.review;
    let deletedProductReview = await ProductReview.deleteOne({
      _id: productReview._id,
    });
    res.json(deletedProductReview);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

module.exports = {
  create,
  productReviewByID,
  read,
  list,
  remove,
  update,
};
