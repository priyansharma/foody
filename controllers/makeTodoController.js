const userTodo = require("../modal/userData")

const makeTodo = async (req, res) => {
  try{
    let task = req.body.task
    let userId = req.cookies.ID
    let saveUserTask
    if(!task){
        res.send("<h1>Please enter task</h1>")
        return
    }
    let isAlreadyExist = await userTodo.find({userID: userId})
    if(isAlreadyExist.length >= 1){
        await userTodo.update(
            {userID: userId}, 
            {$addToSet: {todos: {
                task: task,
                isDone: true
            }}}
        )
    }else{
        saveUserTask = new userTodo({
            userID: userId,
            todos:[{
                task: task,
                isDone: true
            }]
        })
        await saveUserTask.save()
    }
    res.status(200).redirect(`${process.env.BASE_URL}/dashboard`)
  }catch(error){
    console.log(error);
    res.send(`<h1>something went wrong</h1>`)
  }
}

module.exports = makeTodo