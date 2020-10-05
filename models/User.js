class User {
  static create({
    username,
    userpassword,
    useremail,
    dateAdded = new Date(),
    posts = [],
  }) {
    return {
      username,
      userpassword,
      useremail,
      dateAdded,
      posts,
    };
  }
}

module.exports = { User };
