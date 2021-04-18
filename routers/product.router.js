import express from 'express'
const router = express.Router()
import slugify from 'slugify'
import {insertProduct, deleteProduct, getProducts, getProductById} from '../models/product/Product.model.js'
import {newProductValidation} from '../middlewares/formValidation.middleware.js'


router.all("*", (req,res,next)=>{
    next()
 })

router.get("/:_id?", async (req,res)=>{
    const {_id} = req.params
    try{
        const result =  _id ? await getProductById(_id) : await getProducts()
        
        res.json({
            status: "success",
            message: "here are all products result",
            result
        })
    }catch(error){
        throw error
    }
})

router.post("/", newProductValidation, async (req,res)=>{
    console.log(req.body)
    try{

        const result = await insertProduct(req.body)
        if(result._id){
            return res.json({
                status: "success",
                message: "product has been added"
            })
        }
        res.json({
            status: "error",
            message: "unable to addd product"
        })
    }catch(error){
        throw(error)

    }
})

// router.put("/", async (req,res)=>{
//     const _id = req.body
//     try{
//         const result = await getProductById(_id)
//         res.json({
//             status: "success",
//             message: "here are all products result",
//             result
//         })
//     }catch(error){
//         throw error
//     }
// })

router.delete("/", async (req,res)=>{
    //console.log(req.body)
    
    try{

        if(!req.body){
            return res.json({
                status: "error",
                message: "unable to addd product"
            })
            
        }
    

        const result = await deleteProduct(req.body)
        if(result._id){
            return res.json({
                status: "success",
                message: "product has been added"
            })
        }
        res.json({
            status: "error",
            message: "unable to addd product"
        })
    }catch(error){
        throw(error)

    }
})

export default router;