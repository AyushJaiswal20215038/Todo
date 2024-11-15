const router = require('express').Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Sign Up
router.post("/register", async (req,res)=>{
    try {
        const {email , username, password}= req.body;
        const hashpassword = bcrypt.hashSync(password);
        const user = new User({email, username, password: hashpassword});
        await user.save().then(()=>{
            res.status(200).json({message: "Sign Up Successfully"});
        });
    } catch (error) {
        // console.log(error);
        res.status(200).json({message: "User already Exists"});
    }
});

//Sign In
router.post("/signin", async (req,res)=>{
    try {
        const user = await User.findOne({ email: req.body.email });

        if(!user){
            return res.status(200).json({message: "User does not exist! Please Sign Up first"});    
        }

        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!isPasswordCorrect){
            return res.status(200).json({message: "Password is not correct"});    
        }
        const {password , ...others }= user._doc;
        const jwtsecret = process.env.JWT_SECRET;
        
        const jwttoken = jwt.sign({
            ...user
        },jwtsecret); 
        // console.log(jwttoken);
        res.status(200).json({ others , jwttoken ,message: "Signed In Successfully"});
    } catch (error) {
        // console.log(error);
        res.status(200).json({message: "Error in backend"});
    }
});

module.exports = router;