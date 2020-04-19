const {urldecode , tokenToVerify}   = require("../../api/token/tokenParser")

const getBase64UrlUnescape = str => {
    str += new Array(5 - str.length % 4).join('=');
    return str.replace(/\-/g, '+')
      .replace(/\_/g, '/');
  };

module.exports = {
    urldecode,
    tokenToVerify
}