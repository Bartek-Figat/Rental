class User {
  static create({
    username,
    userpassword,
    useremail,
    dateAdded = new Date(),
    posts = [],
    lastLoggedIn = new Date(),
    authToken = null,
    isAuthenticated = false
  }) {
    return {
      username,
      userpassword,
      useremail,
      dateAdded,
      posts,
      lastLoggedIn,
      authToken,
      isAuthenticated
    };
  }
}

module.exports = { User };
