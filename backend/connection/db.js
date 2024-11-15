const mongoose = require('mongoose');

const connect = async (req,res)=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL||"mongodb://localhost:27017/").then(()=>{
            console.log("DB connected online");
        })
    } catch (error) {
        await mongoose.connect("mongodb://localhost:27017/").then(()=>{
            console.log("DB connected locally");
        })
        // return res.status(200).json({
        //     message: "DB not connected",
        // });
    }
};

connect();