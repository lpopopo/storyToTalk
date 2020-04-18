const {urldecode , getBase64UrlEscape}   = require("../../api/token/tokenParser")

module.exports = (token)=>{
    return urldecode(token)
}