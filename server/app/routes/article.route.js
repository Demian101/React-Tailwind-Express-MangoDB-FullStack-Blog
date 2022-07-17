const controller = require("../controllers/article.controller");

module.exports = function(app) {
  app.get("/api/articles", controller.findAll);
  app.get("/api/articles/:id", controller.findById);
  app.post("/api/articles", controller.create);
};