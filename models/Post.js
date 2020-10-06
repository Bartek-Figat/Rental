class Post {
  static createPost({
    createdAt = new Date(),
    location,
    author = ObjectId(),
    title,
    description,
    gallery = [],
    price,
    status,
    address,
    bedrooms,
    bathrooms,
    garages,
  }) {
    return {
      createdAt,
      location,
      author,
      title,
      description,
      gallery,
      price,
      status,
      address,
      bedrooms,
      bathrooms,
      garages,
    };
  }
}

module.exports = { Post };
