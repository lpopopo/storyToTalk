const {queryToDoSy} = require("../../api/mysql/mysqlQuery")

const getcardnum = async(redid)=>{
    const cardselectsql = `select county , process , democracy , science from card where redid='${redid}'`
    const res = await queryToDoSy(cardselectsql)  
    return res  
}

module.exports = {
    getcardnum
}