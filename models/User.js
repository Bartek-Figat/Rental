class User {
  static create({
    username,
    userpassword,
    useremail,
    dateAdded = new Date(),
    posts = [],
    lastLoggedIn = new Date(),
  }) {
    return {
      username,
      userpassword,
      useremail,
      dateAdded,
      posts,
      lastLoggedIn,
    };
  }
}

module.exports = { User };
