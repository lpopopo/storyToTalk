const axios = require("axios");
const qs = require("qs");

//解析传送过来的token，由于token有可能被做为url，
//而base64中的+/=三个字符会被转义，导致url变得更长，所以token的base64会将+转化为-、/转化为_、删除=
const getBase64UrlEscape = str => (
  str.replace(/\s/g, '+')
);


const decodeBase64 = str => Buffer.from(str, 'base64')

//token验证
const SuccessfulCode = 10000;
const VerifyServiceUrl = "https://wx.redrock.team/magicloop/keycenter/verify";
const baseOptions = {
  method: "POST",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  url: VerifyServiceUrl,
}

const isLegalToken = async (token) => {
  if (token) {
    const data = { token };
    const postOptions = {
      ...baseOptions,
      data: qs.stringify(data),
    };
    try {
      const { data } = await axios(postOptions);
      if (data.status == SuccessfulCode) {
        return true;
      }
    } catch (err) {
      // console.log(err.response.data);
    } finally {
      // console.log('发生未知错误')
    }
  }
  return false;
};

const tokenToVerify = async(token) =>{
  const tokendeal = getBase64UrlEscape(token)
  const tokeVerifyRes = await isLegalToken(tokendeal)
  return tokeVerifyRes
}


//解析token获得学生信息
const urldecode = (token) => {
  //将token中的%20即空格替换为+
  try{
    const tokenreplace = getBase64UrlEscape(token)
    const tokensplit = tokenreplace.split(".")
    const payloadbase64 = JSON.parse(decodeBase64(tokensplit[0]).toString())
    return {
      payload: payloadbase64,
    }
  }catch{
    return {}
  }
};

// const str = 'eyJjbGFzcyI6IjAyMTExODA0IiwiY29sbGVnZSI6IuWFieeUteW3peeoi+WtpumZoi/ph43luoblm73pmYXljYrlr7zkvZPlrabpmaIgIiwiZXhwIjoiMTAyMzA0MTcxODUiLCJoZWFkSW1nVXJsIjoiaHR0cDovL3RoaXJkd3gucWxvZ28uY24vbW1vcGVuL3ZpXzMyL0FuVU00VW1nRWJ1cnVCVXhxMW5ObVdDbUw2a0FNUFJkbEZYYWNsV2xNS3NPeHQzdzc1c0pOQWJRR2ZlaDRNMWdoWTdiZDl4aWI3bnQ1SHZpYXFSVU1PaHcvMTMyIiwiaWF0IjoiMTU3NTcwMDMwNSIsIm1ham9yIjoiIiwibmlja25hbWUiOiLlpKnkurrkuqbkuZ3oobAiLCJyZWFsTmFtZSI6IumZiOWFiOWLpCAgICAgICAgICIsInJlZElkIjoiZjVjNDA3YTA3YTJmMGE4NzJiZWIzNDkzMWY2MzRjY2Q0NGRlYmU0NCIsInN0dU51bSI6IjIwMTgyMTA2NTMiLCJzdWIiOiJ4YnMifQ==.xQLRI2J/HqLuAb0yQ+5KsuU2yG0tjz3/4zentmXjLCdTtjcTuPFAk0f7JUcpWXUg94WKlOgs0OouIkZFviLIpf/o6cJlszAT8btXZhmjXh4LR7pSf27DJxv5XblObA8p1bdVFYp/EmBKKnphPAAvcEVU1Pr8IFZ8kTZvEKSXp1a4IKJR4HxQGeDIryms2ydGM2CqTDR4LluXD/0H8y2O0G+GcQaexwzczZbGB1sjeYR0DN2tbp3KQT8Qxb516otWgeIg5IWOxRVD9HKJtdIVrxR1OORKus0wEjx2D/Dl0IEqsiHW1rDfQS8r4q2s3/vaIs9QObs3iKYU+IDMmwu7Sg=='


// tokenToVerify(str)

module.exports = {
  urldecode,
  tokenToVerify
}