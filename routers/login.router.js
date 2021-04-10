import express from 'express'

const router = express.Router()

import {loginValidation } from '../middlewares/formValidation.middleware.js'
import {
    createUser,
     getUserByEmailPassword
    } from '../models/user/User.model.js'

router.all("*", (req,res,next)=>{
    next()
})

const user ={
    fName: "puja",
    lName: "bhan",
    email: "puja@gmail",
    password: "1123"
}
router.post("/", loginValidation, async (req,res)=>{
    //createUser(user)

    try{
        console.log(req.body)
       const result = await getUserByEmailPassword(req.body)
       if(result?._id){
       return res.json({status:"error", message: "login success", result})
       }
        res.json({ status: "error", message: "invalid login details"})

    }catch(error){
        console.log(error)
        throw new Error(error.message)

    }
    
    
  
})

export default router