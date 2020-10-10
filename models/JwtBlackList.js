class Jwt {
  static createJwtBlackList({ jwtBlackList }) {
    return {
      jwtBlackList,
    };
  }
}

module.exports = { Jwt };
