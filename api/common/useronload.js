const {queryToDoSy} = require("../mysql/mysqlQuery")
const {storyarrange} = require("../common/storydispare")

const useronload = async(redId , payload)=>{
    if (redId) {
        //检查用户是否是第一次登录
        const checkusersql = ` select * from users where redid ='${redId}' `
        const data = await queryToDoSy(checkusersql)
        if (data.length === 0) {
            //用户第一次登录
            const { nickname, realName, stuNum, college } = payload
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
        return {
            code: 200,
            story: storyarrange(story),
        }
    }else{
        return {
            code:0,
            errmsg:"token解析错误"
        }
    }
}

const towritebadman = async(payload)=>{
    const { redId,nickname, realName, stuNum, college } = payload
    const classnum = payload.class 
    const sql = `insert into badman(redid , nickname , realname , stunum , class , collage) values 
    ('${redId}' , '${nickname}' , '${realName}' , ${stuNum} , ${classnum} , '${college}');`  
    try{
        await queryToDoSy(sql)
        return true
    }catch{
        return false
    }
}

module.exports = {
    useronload,
    towritebadman
}