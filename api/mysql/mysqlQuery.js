const mysql = require("mysql")
const config = require("./mysqlConfig")


const queryToDo = sql =>{
    return new Promise((reslove , resject)=>{
        //创建mysql连接
        const connection = mysql.createConnection(config)
        connection.query(sql , (err , result)=>{
            if(err) {
                resject(err)
                console.log(err)
            }
            reslove(result)
            connection.end()
        })
    })
}

const queryToDoSy = async sql=>{
     const res = await queryToDo(sql)
     return res
}


module.exports = {
    queryToDoSy
}

