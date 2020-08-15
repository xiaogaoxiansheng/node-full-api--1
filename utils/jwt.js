const jwt = require('jsonwebtoken')

function createToken(data){
    let token = jwt.sign({
        exp:Math.floor (Date.now()/1000)+(60*60*24),
        data:data,
    },'qf')
    return token
}

module.exports ={
    createToken
}