const koa = require("koa")
const router = require("koa-router")
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')

const {queryToDoSy} = require("./api/mysql/mysqlQuery")
const {urldecode , tokenToVerify} =require("./api/common/tokendeal")
const {storytomysql , cardtomysql}  = require("./api/common/storydispare")
const {useronload , towritebadman} = require("./api/common/useronload")
const {getcardnum}  = require("./api/card/cardnum")
const {random , prizelevel , isgetprize , getprizenum , leveltonum} = require("./api/prize/index")

const app = new koa(),
      route = router();

app.use(async (ctx, next) => {
    await next()
    if(ctx.request.method == 'POST'){
        const {token} = ctx.request.body
        const isgoodman = await tokenToVerify(token)
        if (!isgoodman) {
            const { payload } = urldecode(token)
            //记录非法用户
            await towritebadman(payload)
        }
    }
})

app.use(cors())
app.use(bodyParser())



route.get("/reonload" , async (ctx , next)=>{
    //首先接受token
    const {token} = ctx.request.query
    //解析,验证token
    // const res= tokenToVerify(token)
    // if(res) {
    const url = 'https://wx.redrock.team/game/54Story/#/'
    ctx.redirect(`${url}?token=${token}`)
})

route.post("/onload" , async(ctx , next)=>{
    let backword = null
    //首先接受token
    const {token} = ctx.request.body
    //解析token
    const {payload} = urldecode(token)
    try{
        const {redId} = payload
        backword = await useronload(redId , payload)  
        ctx.body = backword 
    }catch{
        ctx.throw(404,"bad token")
    }
})



route.post("/story", async (ctx , next)=>{
    let backword = null
    const postdata = ctx.request.body
    //issnum 第几期 , storynum第几个故事 , cardid 卡片标识 , token
    const {issnum , storynum , cardid , token} = postdata
    //解析token
    const {payload} = urldecode(token)
    console.log(postdata)
    try{
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
                code:200,
                errmsg:"更新完成"
            }
        }
        ctx.body = backword
    }catch(err){
        ctx.throw(404,"bad token")
    }
})

route.post("/card" , async(ctx , next)=>{
    let backword = null
    //首先接受token
    const {token} = ctx.request.body
    //解析token
    const {payload} = urldecode(token)
    try{
        const {redId} = payload    
        const card = await getcardnum(redId)
        backword={
            code:200,
            card: card[0]        
        }
        ctx.body = backword
    }catch{
        ctx.throw(404,"bad token")
    }
})



route.post("/prize" , async (ctx , next)=>{
    const {token} = ctx.request.body
    //解析token
    try{
        const {payload} = urldecode(token)
        const {redId} = payload    
        let backword = null
        const num = random()
        if (num > 160) {
            //未中奖
            backword = {
                code: 200,
                level: 0
            }
        } else if (num >= 1 && num <= 160) {
            //中奖
            //查看是否已经中奖
            const isget = await isgetprize(redId)
            if (isget) {
                //已经中奖
                backword = {
                    code: 200,
                    level: 0
                }
            } else {
                //没有中奖
                const level = prizelevel(num)
                //查看奖品数量
                const prizenum = await getprizenum(level)
                if (prizenum === 0) {
                    //奖品发完
                    backword = {
                        code: 200,
                        level: 0
                    }
                } else {
                    //中奖
                    const levelnum = leveltonum(level)
                    const sql = `update prizenum set ${level} = ${level} - 1;
                                 insert into usergetprize(redid , prizelevel) values ('${redId}' , ${levelnum});`
                    await queryToDoSy(sql)
                    backword = {
                        code: 200,
                        level: levelnum
                    }
                }
            }
        }
        //卡片数量-1
        const cardnumlesssql = `update  card set county = county-1 ,process = process-1 , democracy = democracy-1 , science = science-1
            where redid='${redId}'`
        await queryToDoSy(cardnumlesssql)
    
        ctx.body = backword
    }catch{
        ctx.throw(404,"bad token")
    }
})

app.use(route.routes())
app.listen(8000)
console.log("server is run at port 8000")