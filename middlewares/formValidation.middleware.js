import joi from 'joi'

const email = joi.string().min(3).max(50).required()
const password = joi.string().required()
const shortStr = joi.string().max(100)
const longStr = joi.string().max(2000)
const date = joi.date()
const num = joi.number()
const args = joi.array()


export const loginValidation = (req,res,next)=>{
    const schema = joi.object({email, password})

    //validation
    const value = schema.validate(req.body)
    console.log(value)
    if(value.error){
       return res.json({
            status: 'error',
            message: value.error.message,
        })
    }
    next()
}

export const newProductValidation = (req,res,next)=>{
    const schema = joi.object({
  name: shortStr.required(),
  qty: num.required(),
  isAvailable: shortStr,
  price: num.required(),
  salePrice: num,
  saleEndDate: date,
  description: longStr.required(),
  images: args,
  categories: args,
  //salePriceEndDate: date,

    })

    //validation
    const value = schema.validate(req.body)
    console.log(value)
    if(value.error){
       return res.json({
            status: 'error',
            message: value.error.message,
        })
    }
    next()
}