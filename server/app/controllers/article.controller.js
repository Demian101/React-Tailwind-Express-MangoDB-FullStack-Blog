const db = require("../models");
const Article = db.article;
const Category = db.category;
const Tag = db.tag;

// Retrieve All Articles from the Database
exports.findAll = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};


// Find a single article with an id
exports.findById = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const article = await Article.findById(_id);
    res.status(200).json(article);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

/*  这样写也是可以的
     then(article => {
      if (!article) {
          res.send({ message: "Article not found with id " + req.params.id });
        }
      res.send(article);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
          res.send({ message: "Article not found with id " + req.params.id });
        }
      res.send({ message: "Error retrieving article with id " + req.params.id });
    });
}
*/ 

//  New Article
exports.create = async (req, res) => {
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    body: req.body.body,
    category: req.body.category,
    tags: req.body.tags
  });

  article.save((err, article) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Article was created successfully!" });
  });
}

/*  这样写也是可以的
export const create = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};
*/
 

/* 更新和删除文章 
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndRemove(_id);
    res.status(200).json(deletedPost);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};
*/