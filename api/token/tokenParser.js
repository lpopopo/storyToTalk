const crypto = require('crypto');
const fs = require("fs")
const path = require("path")

const pubkey  = fs.readFileSync(  path.resolve(__dirname , "./pub.pem")).toString()

//解析传送过来的token，由于token有可能被做为url，
//而base64中的+/=三个字符会被转义，导致url变得更长，所以token的base64会将+转化为-、/转化为_、删除=
const getBase64UrlEscape = str => (
  str.replace(/\s/g, '+')
    .replace(/\_/g, '/')
    .replace(/-/g, '=')
);

//token验证
const codeToVerify = (code , signature) =>{
    //首先对playload ,signature 进行base64解码
    code = getBase64UrlUnescape(code)
    signature = getBase64UrlUnescape(signature)
    //payload取SHA-256
    const hash = crypto.createHash('sha256')
    const codeToSha =  hash.update(code).digest("base64")
    console.log("负载"+code+"\n")
    console.log("签名"+signature)
    console.log(pubkey)
    //验签
    const verify = crypto.createVerify('RSA-SHA256');
    console.log(verify.update(codeToSha).verify(pubkey, signature , 'base64'))
}


const getBase64UrlUnescape = str => {
    str += new Array(5 - str.length % 4).join('=');
    return str.replace(/\-/g, '+')
      .replace(/\_/g, '/');
  };
  
  const decodeBase64Url = str => JSON.parse(
      Buffer.from(getBase64UrlUnescape(str), 'base64').toString()
   )



  const urldecode = (token) => {
    const segments = token.split('.');
    return {
      payload: decodeBase64Url(segments[0]),
    };
  };
  // const str = 'eyJjbGFzcyI6IjAyMTExODA0IiwiY29sbGVnZSI6IuWFieeUteW3peeoi+WtpumZoi/ph43luoblm73pmYXljYrlr7zkvZPlrabpmaIgIiwiZXhwIjoiMTAyMzA0MTcxODUiLCJoZWFkSW1nVXJsIjoiaHR0cDovL3RoaXJkd3gucWxvZ28uY24vbW1vcGVuL3ZpXzMyL0FuVU00VW1nRWJ1cnVCVXhxMW5ObVdDbUw2a0FNUFJkbEZYYWNsV2xNS3NPeHQzdzc1c0pOQWJRR2ZlaDRNMWdoWTdiZDl4aWI3bnQ1SHZpYXFSVU1PaHcvMTMyIiwiaWF0IjoiMTU3NTcwMDMwNSIsIm1ham9yIjoiIiwibmlja25hbWUiOiLlpKnkurrkuqbkuZ3oobAiLCJyZWFsTmFtZSI6IumZiOWFiOWLpCAgICAgICAgICIsInJlZElkIjoiZjVjNDA3YTA3YTJmMGE4NzJiZWIzNDkzMWY2MzRjY2Q0NGRlYmU0NCIsInN0dU51bSI6IjIwMTgyMTA2NTMiLCJzdWIiOiJ4YnMifQ==.xQLRI2J/HqLuAb0yQ+5KsuU2yG0tjz3/4zentmXjLCdTtjcTuPFAk0f7JUcpWXUg94WKlOgs0OouIkZFviLIpf/o6cJlszAT8btXZhmjXh4LR7pSf27DJxv5XblObA8p1bdVFYp/EmBKKnphPAAvcEVU1Pr8IFZ8kTZvEKSXp1a4IKJR4HxQGeDIryms2ydGM2CqTDR4LluXD/0H8y2O0G+GcQaexwzczZbGB1sjeYR0DN2tbp3KQT8Qxb516otWgeIg5IWOxRVD9HKJtdIVrxR1OORKus0wEjx2D/Dl0IEqsiHW1rDfQS8r4q2s3/vaIs9QObs3iKYU+IDMmwu7Sg=='
  // console.log(urldecode(str))

 module.exports = {
     urldecode,
     getBase64UrlEscape
 }