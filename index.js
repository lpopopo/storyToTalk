const koa = require("koa")
const router = require("koa-router")
const bodyParser = require('koa-bodyparser')

const {queryToDoSy} = require("./api/mysql/mysqlQuery")
const {urldecode}   = require("./api/token/tokenParser")
const {storyarrange , storytomysql , cardtomysql}  = require("./api/common/storydispare")
const str = `eyJjbGFzcyI6IjAyMTExODA0IiwiY29sbGVnZSI6IuWFieeUteW3peeoi+WtpumZoi/ph43luoblm73pmYXljYrlr7zkvZPlrabpmaIgIiwiZXhwIjoiMTAyMzA0MTcxODUiLCJoZWFkSW1nVXJsIjoiaHR0cDovL3RoaXJkd3gucWxvZ28uY24vbW1vcGVuL3ZpXzMyL0FuVU00VW1nRWJ1cnVCVXhxMW5ObVdDbUw2a0FNUFJkbEZYYWNsV2xNS3NPeHQzdzc1c0pOQWJRR2ZlaDRNMWdoWTdiZDl4aWI3bnQ1SHZpYXFSVU1PaHcvMTMyIiwiaWF0IjoiMTU3NTcwMDMwNSIsIm1ham9yIjoiIiwibmlja25hbWUiOiLlpKnkurrkuqbkuZ3oobAiLCJyZWFsTmFtZSI6IumZiOWFiOWLpCAgICAgICAgICIsInJlZElkIjoiZjVjNDA3YTA3YTJmMGE4NzJiZWIzNDkzMWY2MzRjY2Q0NGRlYmU0NCIsInN0dU51bSI6IjIwMTgyMTA2NTMiLCJzdWIiOiJ4YnMifQ==.xQLRI2J/HqLuAb0yQ+5KsuU2yG0tjz3/4zentmXjLCdTtjcTuPFAk0f7JUcpWXUg94WKlOgs0OouIkZFviLIpf/o6cJlszAT8btXZhmjXh4LR7pSf27DJxv5XblObA8p1bdVFYp/EmBKKnphPAAvcEVU1Pr8IFZ8kTZvEKSXp1a4IKJR4HxQGeDIryms2ydGM2CqTDR4LluXD/0H8y2O0G+GcQaexwzczZbGB1sjeYR0DN2tbp3KQT8Qxb516otWgeIg5IWOxRVD9HKJtdIVrxR1OORKus0wEjx2D/Dl0IEqsiHW1rDfQS8r4q2s3/vaIs9QObs3iKYU+IDMmwu7Sg==`

const app = new koa(),
      route = router();

app.use(bodyParser())


route.get("/onload" , async (ctx , next)=>{
    let backword = null
    //首先接受token
    // const token = ctx.query.token
    const token = str
    //解析token
    const {payload} = urldecode(token)
    const {redId} = payload
    //检查用户是否是第一次登录
    const checkusersql = ` select * from users where redid ='${redId}' `
    const data =  await queryToDoSy(checkusersql)
    if(data.length === 0){
        //用户第一次登录
        const { nickname , realName , stuNum , college } = payload
        const classnum = payload.class
        const useraddsql = `insert into users(redid , nickname , realname , stunum , class , collage) values 
        ('${redId}' , '${nickname}' , '${realName}' , ${stuNum} , ${classnum} , '${college}');
        INSERT into story(redid) VALUES("${redId}");
        insert into card(redid)   values('${redId}'); 
        `
        await queryToDoSy(useraddsql)
        backword={"query" : "ok"}
    }
    //用户登录过，查询以往的记录
    const storyselectsql = `select * from story where redid='${redId}'`
    const story = await queryToDoSy(storyselectsql)
    const cardselectsql = `select county , process , democracy , science from card where redid='${redId}'`
    const card = await queryToDoSy(cardselectsql)
    backword = {
        story:storyarrange(story),
        card: card[0]
    }
    ctx.body =  backword
})

route.get("/story", async (ctx , next)=>{
    let backword
    const postdata = ctx.request.body
    //issnum 第几期 , storynum第几个故事 , cardid 卡片标识
    const {issnum , storynum , cardid} = postdata
    const token = str
    //解析token
    const {payload} = urldecode(token)
    const {redId} = payload
    const storymysql = storytomysql(issnum , storynum)
    const cardmysql  = cardtomysql(cardid)
    if(!storymysql || !cardmysql){
        backword = {
            code:0,
            errmsg : '字段有误'
        }
    }else{
        const updatesql = `update story set ${storymysql} = 1 where redid = '${redId}';
        update card set ${cardmysql} = ${cardmysql}+1 where redid = '${redId}'
        `
        await queryToDoSy(updatesql)
        backword = {
            code:1,
            errmsg:"更新完成"
        }
    }
    ctx.body = backword
})


app.use(route.routes())

app.listen(8000)
console.log("server is run at port 8000")