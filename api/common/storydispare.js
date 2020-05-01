
const storyarrange = story =>{
    const list = story[0]
    const storyList = {
        frist  : [],
        second : [],
        third  : []
    }
    Object.keys(list).map(key =>{
        if(key.match(/frist_/)){
            storyList.frist.push(list[key])
        }else if(key.match(/second_/)){
            storyList.second.push(list[key])
        }else if(key.match(/third_/)){
            storyList.third.push(list[key])
        }
    })
    return storyList
}

const storytomysql = (issnum , storynum) =>{
    let iss 
    switch(issnum){
        case '1':
            iss = "frist"
            break;
        case '2':
            iss = "second"
            break;
        case '3':
            iss = "third"
            break;
        default:
            break;            
    }
    if(!iss) return
    return iss+'_'+storynum
}

const cardtomysql = cardid =>{
    let card
    switch(cardid){
        case '1':
            card = "county"
            break;
        case '2':
            card = "process"
            break;
        case '3':
            card = "democracy"  
            break;
        case '4':
            card = "science"  
            break;
        default:
            break;        
    }
    return card
}

module.exports = {
    storyarrange,
    storytomysql,
    cardtomysql
}