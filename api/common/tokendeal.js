const {urldecode , getBase64UrlEscape}   = require("../../api/token/tokenParser")

module.exports = (token)=>{
    const tokenToBase64 = getBase64UrlEscape(token)
    return urldecode(tokenToBase64)
}