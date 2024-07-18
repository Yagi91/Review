const mongoose = require("mongoose");
const crypto = require("crypto");

const ObjectId = mongoose.Types.ObjectId;

const ProductReviewSchema = new mongoose.Schema({
  productName: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  reviewSnippet: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    required: "Rating is required",
  },
  reviewText: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: { type: Date, default: Date.now },
});

ProductReviewSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Product-Review", ProductReviewSchema);
