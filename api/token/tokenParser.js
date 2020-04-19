const crypto = require('crypto');

const pubkeyget = async()=>{
  //  const res = await axios.get("https://cyxbsmobile.redrock.team/magicloop/keycenter/public")
  //  const {pub} = res.data.data
  const pub = "-----BEGIN PUBLIC KEY-----\n" +
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1WXAZZkfDo4H5AfnF82r\n" +
    "nPZNEhBaDQKI6IT+CBI4uUSBc+iq9OeLuWy/9tqIwn7WC1BVhFQQNbbI44jTReCS\n" +
    "h4/RXd5AOI/fBzLVr8qlEUSMUSX1JzhBfrfVCV/0tMMy1Bh6yn6Cb2LFgfBglUsE\n" +
    "tuTZlCnmE2+V45paoGH2tO3mIqkopBAz5kIn+TJ7dhpxivIfRAx2HyVq4JJy4CQD\n" +
    "Jy/pZ6fYamnVl8p1IiONmU1hS8MDZysoxk5e6mv0OFVaXd8naoN9dlD7OmW86N+Y\n" +
    "8k1qIVcBPIkAQp2N+APhIueolC4kgF8Zjlkbw9cJFFYA8f5D1DU5acv/wQt58Ypi\n" +
    "jwIDAQAB\n" +
    "-----END PUBLIC KEY-----"
  return pub
}


//解析传送过来的token，由于token有可能被做为url，
//而base64中的+/=三个字符会被转义，导致url变得更长，所以token的base64会将+转化为-、/转化为_、删除=
const getBase64UrlEscape = str => (
  str.replace(/\s/g, '+')
);


const decodeBase64 = str => Buffer.from(str, 'base64')

//token验证
const tokenToVerify = async(token) =>{
    const {payload , signature} = urldecode(token)
    //payload取SHA-256
    const hash = crypto.createHash('sha256')
    const payloadToSha =  hash.update(JSON.stringify(payload)).digest("base64")
    const pubkey = await pubkeyget()
    const signaturedec = crypto.publicDecrypt(pubkey, signature).toString("base64")
    //验签
    console.log(payloadToSha)
    console.log(signaturedec)
    return payloadToSha == signaturedec
}



const urldecode = (token) => {
  //将token中的%20即空格替换为+
  const tokenreplace = getBase64UrlEscape(token)
  const tokensplit = tokenreplace.split(".")
  const payloadbase64 = JSON.parse(decodeBase64(tokensplit[0]).toString())
  const signaturebase64 = decodeBase64(tokensplit[1])
  return {
    payload: payloadbase64,
    signature: signaturebase64
  }
};

// const str = 'eyJjbGFzcyI6IjAyMTExODA0IiwiY29sbGVnZSI6IuWFieeUteW3peeoi+WtpumZoi/ph43luoblm73pmYXljYrlr7zkvZPlrabpmaIgIiwiZXhwIjoiMTAyMzA0MTcxODUiLCJoZWFkSW1nVXJsIjoiaHR0cDovL3RoaXJkd3gucWxvZ28uY24vbW1vcGVuL3ZpXzMyL0FuVU00VW1nRWJ1cnVCVXhxMW5ObVdDbUw2a0FNUFJkbEZYYWNsV2xNS3NPeHQzdzc1c0pOQWJRR2ZlaDRNMWdoWTdiZDl4aWI3bnQ1SHZpYXFSVU1PaHcvMTMyIiwiaWF0IjoiMTU3NTcwMDMwNSIsIm1ham9yIjoiIiwibmlja25hbWUiOiLlpKnkurrkuqbkuZ3oobAiLCJyZWFsTmFtZSI6IumZiOWFiOWLpCAgICAgICAgICIsInJlZElkIjoiZjVjNDA3YTA3YTJmMGE4NzJiZWIzNDkzMWY2MzRjY2Q0NGRlYmU0NCIsInN0dU51bSI6IjIwMTgyMTA2NTMiLCJzdWIiOiJ4YnMifQ==.xQLRI2J/HqLuAb0yQ+5KsuU2yG0tjz3/4zentmXjLCdTtjcTuPFAk0f7JUcpWXUg94WKlOgs0OouIkZFviLIpf/o6cJlszAT8btXZhmjXh4LR7pSf27DJxv5XblObA8p1bdVFYp/EmBKKnphPAAvcEVU1Pr8IFZ8kTZvEKSXp1a4IKJR4HxQGeDIryms2ydGM2CqTDR4LluXD/0H8y2O0G+GcQaexwzczZbGB1sjeYR0DN2tbp3KQT8Qxb516otWgeIg5IWOxRVD9HKJtdIVrxR1OORKus0wEjx2D/Dl0IEqsiHW1rDfQS8r4q2s3/vaIs9QObs3iKYU+IDMmwu7Sg=='


// tokenToVerify(str)

module.exports = {
  urldecode,
  tokenToVerify
}