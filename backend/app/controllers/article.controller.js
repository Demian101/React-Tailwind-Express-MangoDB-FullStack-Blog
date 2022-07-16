const db = require("../models/article");
const Article = db.article;

// Create and Save a new Article
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.content) {
    res.status(400).send({ message: "Article title or content can not be empty!" });
    return;
  }

  // Create a Article
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
    published: req.body.published ? req.body.published : false
  });

  // Save Article in the database
  article
    .save(article)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Article."
      });
    });
};

// Retrieve all Article from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Article.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles."
      });
    });
};

// Find a single Article with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Article.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Article with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Article with id=" + id });
    });
};

// Update a Article by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Article.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Article with id=${id}. Maybe Article was not found!`
        });
      } else res.send({ message: "Article was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Article with id=" + id
      });
    });
};

// Delete a Article with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Article.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Article with id=${id}. Maybe Article was not found!`
        });
      } else {
        res.send({
          message: "Article was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Article with id=" + id
      });
    });
};

// Delete all Article from the database.
exports.deleteAll = (req, res) => {
  Article.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Article were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all articles."
      });
    });
};

// Find all published Article
exports.findAllPublished = (req, res) => {
  Article.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles."
      });
    });
};
