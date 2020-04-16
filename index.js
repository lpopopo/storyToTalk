const koa = require("koa")
const router = require("koa-router")
const bodyParser = require('koa-bodyparser')

const app = new koa(),
      route = router();

app.use(bodyParser())


route.get("/" , async (ctx , next)=>{
    const query = ctx.request.body
    ctx.body = "hello world"
})

route.get("/home", async (ctx , next)=>{
    ctx.body = "this is home"
})


app.use(route.routes())

app.listen(8000)
console.log("server is run at port 8000")