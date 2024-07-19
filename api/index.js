const config = require("../config/global.config");
const server = require("../express");
const mongoose = require("mongoose");
require("dotenv").config();

server.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});

mongoose.Promise = global.Promise;

mongoose
  .connect(config.mongoUri, {
    dbName: "review",
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => {
    console.log(err);
    throw new Error(`Unable to connect to database: ${config.mongoUri}`);
  });

module.exports = server;
