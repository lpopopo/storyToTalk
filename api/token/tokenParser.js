const crypto = require('crypto');

const pubkey  = '-----BEGIN public keycenter-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1WXAZZkfDo4H5AfnF82r\nnPZNEhBaDQKI6IT+CBI4uUSBc+iq9OeLuWy/9tqIwn7WC1BVhFQQNbbI44jTReCS\nh4/RXd5AOI/fBzLVr8qlEUSMUSX1JzhBfrfVCV/0tMMy1Bh6yn6Cb2LFgfBglUsE\ntuTZlCnmE2+V45paoGH2tO3mIqkopBAz5kIn+TJ7dhpxivIfRAx2HyVq4JJy4CQD\nJy/pZ6fYamnVl8p1IiONmU1hS8MDZysoxk5e6mv0OFVaXd8naoN9dlD7OmW86N+Y\n8k1qIVcBPIkAQp2N+APhIueolC4kgF8Zjlkbw9cJFFYA8f5D1DU5acv/wQt58Ypi\njwIDAQAB\n-----END public keycenter-----\n'

//token验证
const codeToVerify = (code , signature) =>{
    //首先对playload ,signature 进行base64解码
    code = getBase64UrlUnescape(code)
    signature = getBase64UrlUnescape(signature)
    //payload取SHA-256
    const hash = crypto.createHash('sha256')
    const codeToSha =  hash.update(code).digest("base64")
    console.log(codeToSha+"\n")
    console.log(signature)
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
    new Buffer(getBase64UrlUnescape(str), 'base64').toString()
  )


  const urldecode = (token) => {
    const segments = token.split('.');
    // return {
    //   payload: decodeBase64Url(segments[0]),
    // };
    codeToVerify(segments[0] , segments[1])
  };

  const str = `eyJjbGFzcyI6IjAyMTExODA0IiwiY29sbGVnZSI6IuWFieeUteW3peeoi+WtpumZoi/ph43luoblm73pmYXljYrlr7zkvZPlrabpmaIgIiwiZXhwIjoiMTAyMzA0MTcxODUiLCJoZWFkSW1nVXJsIjoiaHR0cDovL3RoaXJkd3gucWxvZ28uY24vbW1vcGVuL3ZpXzMyL0FuVU00VW1nRWJ1cnVCVXhxMW5ObVdDbUw2a0FNUFJkbEZYYWNsV2xNS3NPeHQzdzc1c0pOQWJRR2ZlaDRNMWdoWTdiZDl4aWI3bnQ1SHZpYXFSVU1PaHcvMTMyIiwiaWF0IjoiMTU3NTcwMDMwNSIsIm1ham9yIjoiIiwibmlja25hbWUiOiLlpKnkurrkuqbkuZ3oobAiLCJyZWFsTmFtZSI6IumZiOWFiOWLpCAgICAgICAgICIsInJlZElkIjoiZjVjNDA3YTA3YTJmMGE4NzJiZWIzNDkzMWY2MzRjY2Q0NGRlYmU0NCIsInN0dU51bSI6IjIwMTgyMTA2NTMiLCJzdWIiOiJ4YnMifQ==.xQLRI2J/HqLuAb0yQ+5KsuU2yG0tjz3/4zentmXjLCdTtjcTuPFAk0f7JUcpWXUg94WKlOgs0OouIkZFviLIpf/o6cJlszAT8btXZhmjXh4LR7pSf27DJxv5XblObA8p1bdVFYp/EmBKKnphPAAvcEVU1Pr8IFZ8kTZvEKSXp1a4IKJR4HxQGeDIryms2ydGM2CqTDR4LluXD/0H8y2O0G+GcQaexwzczZbGB1sjeYR0DN2tbp3KQT8Qxb516otWgeIg5IWOxRVD9HKJtdIVrxR1OORKus0wEjx2D/Dl0IEqsiHW1rDfQS8r4q2s3/vaIs9QObs3iKYU+IDMmwu7Sg==`

 urldecode(str)