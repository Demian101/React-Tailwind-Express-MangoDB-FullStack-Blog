module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      title: String,
      content: String,
      published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    // __v: versionKey
    // toObject: converts the mongoose document into a plain JavaScript object.
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Article = mongoose.model("article", schema);
  return Article;
};
