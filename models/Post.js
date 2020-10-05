class Post {
  static createPost({
    createdAt = new Date(),
    location,
    author = ObjectId(),
    title,
    description,
    street,
    city,
  }) {
    return {
      createdAt,
      location,
      author,
      title,
      description,
      street,
      city,
    };
  }
}

module.exports = { Post };
