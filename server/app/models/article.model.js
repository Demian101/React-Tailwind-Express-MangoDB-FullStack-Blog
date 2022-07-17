const mongoose = require("mongoose");

const Article = mongoose.model(
  "Article",
  new mongoose.Schema({
    title: String,
    description: String,
    body: String,
    category: String,
    tags: [String]
  })
);

module.exports = Article;
