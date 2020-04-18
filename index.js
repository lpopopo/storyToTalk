const koa = require("koa")
const router = require("koa-router")
const bodyParser = require('koa-bodyparser')

const {queryToDoSy} = require("./api/mysql/mysqlQuery")
const tokendeal =require("./api/common/tokendeal")
const {storyarrange , storytomysql , cardtomysql}  = require("./api/common/storydispare")

const app = new koa(),
      route = router();

app.use(bodyParser())


route.post("/onload" , async (ctx , next)=>{
    let backword = null
    //首先接受token
    const {token} = ctx.request.query
    //解析token
    const {payload} = tokendeal(token)
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
    }
    //用户登录过，查询以往的记录
    const storyselectsql = `select * from story where redid='${redId}'`
    const story = await queryToDoSy(storyselectsql)
    backword = {
        code:200,
        story:storyarrange(story),
    }
    ctx.body =  backword
})

route.post("/story", async (ctx , next)=>{
    let backword
    const postdata = ctx.request.body
    //issnum 第几期 , storynum第几个故事 , cardid 卡片标识
    const {issnum , storynum , cardid} = postdata
    //首先接受token
    const {token} = ctx.request.query
    //解析token
    const {payload} = tokendeal(token)
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
    const {payload} = tokendeal(token)
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