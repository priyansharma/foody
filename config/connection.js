const mySql = require("mysql")

const mySqlConfig = mySql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'Foody@1234',
})

mySqlConfig.connect((err) => {
    if(err){
        console.log("Connection faild", err)
    }else{
        console.log("Application is connected")
    }
})