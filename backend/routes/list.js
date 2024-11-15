const router = require('express').Router();
const User= require("../models/user");
const List = require("../models/list");
const userauth = require("../middleware/authentication");


// Create
router.post("/addTask",userauth,async (req,res)=>{
    try {
        const {title, body, id} = req.body;
        const existingUser = await User.findById(id);
        if(existingUser){
            const list = new List({title ,  body , user : existingUser});
            await list.save().then(()=> res.status(200).json({_id:list._id,title:list.title,body:list.body}));
            existingUser.list.push(list);
            existingUser.save(); 
        }
    } catch (error) {
        // console.log(error);
        res.status(200).json({ message: "Problem in Backend" });
    }
})

//Update
router.put("/updateTask/:id",userauth,async (req,res)=>{
    try {
        const {title , body}= req.body;
        const list = await List.findByIdAndUpdate(req.params.id , { title , body });
        list.save().then(()=> res.status(200).json({ message : "Update Completed" }));
        
    } catch (error) {
        res.status(200).json({message: "Backend Error"});
        // console.log(error);
    }
})

//Delete
router.delete("/deleteTask/:id",userauth,async (req,res)=>{
    try {
        const {id} = req.body;
        
        const existingUser = await User.findByIdAndUpdate(
            id,
            { $pull: {list: req.params.id}}
        );
        
        if(existingUser){
            await List.findByIdAndDelete(req.params.id)
                .then(()=> res.status(200).json({ message : "Your Task is Deleted" })
            );
        }
    } catch (error) {
        // console.log(error);
        
        res.status(200).json({message: "Backend Error"});
    }
})

//getTask
router.get("/getTasks/:id",userauth, async (req,res)=>{
    try {
        const list =await List.find({ user :req.params.id },{_id: 1, title: 1, body: 1}).sort({createdAt : -1});
        if(list.length!==0){
            res.status(200).json({list});
        }
        else{
            res.status(200).json({message: "No Tasks"});
        }
    } catch (error) {
        res.status(400).json({error});
    }
})



module.exports = router;