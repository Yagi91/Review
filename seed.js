/// Run this file to Seed the databse with faker.js

const mongoose = require("mongoose");
const ProductReview = require("./models/product-review.model");
const { faker } = require("@faker-js/faker");
const config = require("./config/global.config");
const debug = require("debug")("review:user.controller.js");

const seedNumber = 20;

mongoose.Promise = global.Promise;
debug("running");

mongoose
  .connect(config.mongoUri, {
    dbName: "review",
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => {
    debug(err);
    throw new Error(`Unable to connect to database: ${config.mongoUri}`);
  });

function createRandomProductReview() {
  return {
    productName: faker.commerce.productName(),
    reviewSnippet: faker.commerce.productDescription(),
    rating: faker.number.float({ min: 0, max: 5, multipleOf: 0.1 }),
    reviewText: faker.lorem.paragraph(3),
    image: faker.image.urlLoremFlickr({ width: 540, height: 480 }),
    created: faker.date.past({ years: 5 }),
  };
}

// const productReview = createRandomProductReview();

for (let i = 0; i < seedNumber; i++) {
  const productReview = createRandomProductReview();
  debug(productReview);

  try {
    const newProductReview = new ProductReview(productReview);
    newProductReview.save();
  } catch (e) {
    debug("error seeding DB" + e.message);
  }
}

console.log("Running test with seed:", faker.seed());
