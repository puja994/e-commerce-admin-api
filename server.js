import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()
import path from "path";

import cors from 'cors'
import morgan from 'morgan'
 
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(morgan("tiny"))

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

import mongoClient from './config/db.js'
mongoClient()

import loginRouter from './routers/login.router.js'
import categoryRouter from './routers/category.router.js'
import productRouter from './routers/product.router.js'


//APIS use routers

app.use('/api/v1/login', loginRouter)
app.use('/api/v1/category', categoryRouter)
app.use("/api/v1/product", productRouter)

app.get('/', (req, res) => {
  res.send('Hello World')
})

//404 return
app.use((req, res, next)=>{
  const error = new Error("resources not found")
  error.status = 404
  next(error)
})

//handle error
import {handleError} from './utils/errorHandler.js'

app.use((error,req,res,next)=>{
handleError(error, res)
})
 
app.listen(PORT, error =>{
    if (error) console.log(error)
    console.log(`server is running at http://localhost:${PORT}`)
})