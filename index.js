const koa = require("koa")
const router = require("koa-router")
const bodyParser = require('koa-bodyparser')

const {queryToDoSy} = require("./api/mysql/mysqlQuery")
const {urldecode , tokenToVerify} =require("./api/common/tokendeal")
const {storytomysql , cardtomysql}  = require("./api/common/storydispare")
const {useronload} = require("./api/common/useronload")

const app = new koa(),
      route = router();

app.use(bodyParser())


route.get("/reonload" , async (ctx , next)=>{
    let backword = null
    //首先接受token
    const {token} = ctx.request.query
    //解析,验证token
    const res= tokenToVerify(token)
    if(res) const{payload} = urldecode(token)
    const {redId} = payload
    backword = useronload(redId)
    ctx.redirect(`url?token=${token}`)
    ctx.body = backword
})

route.post("/onload" , async(ctx , next)=>{
    let backword = null
    //首先接受token
    const {token} = ctx.request.query
    //解析token
    const {payload} = urldecode(token)
    const {redId} = payload
    backword = useronload(redId)   
    ctx.body = backword 
})



route.post("/story", async (ctx , next)=>{
    let backword
    const postdata = ctx.request.body
    //issnum 第几期 , storynum第几个故事 , cardid 卡片标识
    const {issnum , storynum , cardid} = postdata
    //首先接受token
    const {token} = ctx.request.query
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
            code:200,
            errmsg:"更新完成"
        }
    }
    ctx.body = backword
})

route.post("/card" , async(ctx , next)=>{
    let backword = null
    //首先接受token
    const {token} = ctx.request.query
    //解析token
    const {payload} =urldecode(token)
    const {redId} = payload    
    try{
        const cardselectsql = `select county , process , democracy , science from card where redid='${redId}'`
        const card = await queryToDoSy(cardselectsql)
        backword={
            code:200,
            card: card[0]        
        }
    }catch{
        backword={
            code:500, 
        }   
    }
    ctx.body = backword
})



route.post("/prize" , (ctx , next)=>{
    //待定
})

app.use(route.routes())

app.listen(8000)
console.log("server is run at port 8000")