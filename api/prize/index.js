const {queryToDoSy} = require("../../api/mysql/mysqlQuery")

const random = ()=>{
    return  Math.floor(Math.random()*1000+1)  //生成1-1000的随机数
}


const prizelevel = (num)=>{
    let level
    if(num>=1 && num<=10){
        level = 'first'
    }else if(num>10 && num<=35){
        level = 'second'
    }else if(num>35 && num<=85){
        level = 'third'
    }else if(num>86 && num<=160){
        level = 'lucky'
    }
    return level
}

const isgetprize = async (redid)=>{
    let sqlofusergetprize = `select * from usergetprize where redid ='${redid}'`
    const res = await queryToDoSy(sqlofusergetprize)
    return !(res.length === 0)
}

const getprizenum = async (level)=>{
    const sql = `select ${level} from prizenum`
    const res = await queryToDoSy(sql)
    return res[0][level]
}

const leveltonum = (level)=>{
    let levelnum
    switch(level){
        case "first": 
              levelnum = 1
              break;
        case "second":
            levelnum = 2
            break;
        case "third":
            levelnum = 3
            break;
        case "lucky":
            levelnum = 4
            break;
        default:
            break;    
    }
    return levelnum
}

const checkgetprize = async(redid)=>{
    let sqlofusergetprize = `select * from usergetprize where redid ='${redid}'`
    const isget = isgetprize(redid)
    if(!isget) return 0
    const res = queryToDoSy(sqlofusergetprize)
    return res[0]["prizelevel"]
}
module.exports = {
    random,
    prizelevel,
    isgetprize,
    getprizenum,
    leveltonum,
    checkgetprize
}
