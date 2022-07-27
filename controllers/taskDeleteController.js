const taskModal = require("../modal/userData")

const deleteController = async (req, res) => {
    try{
        const sucessMessage = {code: 1}
        let getTaskID = req.body.taskId
        await taskModal.findOneAndUpdate({}, {$pull: {"todos": {"_id": getTaskID}}})    
        res.json(sucessMessage)
    }catch(error){
        console.log(error)
        res.send("Sorry, Something went wrong in delete process")
    }
}

module.exports = deleteController