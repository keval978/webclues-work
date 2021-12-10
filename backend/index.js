const express = require('express');
const cors = require('cors')
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const app = express()

//middleware

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/mernloginandregis",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log("connection success db");
}).catch((e)=>{
    console.log("connection not succesfuls");
})


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})


const User  = new mongoose.model('User',userSchema);



app.post('/login', (req,res)=>{
    const{email,password} = req.body

    User.findOne({email:email},(err,user)=>{
        if(user){   
            const validPassword  = bcrypt.compareSync(password,user.password)
            if(validPassword){
                res.send({message:"Login successful",user:user})
            }else{
                res.send({message:"password are not match"})
            }

        }else{
            res.send({message:"user not found"})
        }
    })
    
})



app.post('/register', (req,res)=>{
    // console.log(req.body)

    const{name,email,password} = req.body

    
    var securePassword = bcrypt.hashSync(password,10)

    User.findOne({email:email}, (err,user)=>{
        if(user){
            res.send({message:"user alredy register"})
        }else{
            const user = new User({
                name,
                email,
                password:securePassword
            })
            user.save(err =>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"register succus"})
                }
            })
        }
    })
   
})

app.listen(5000,()=>{
    console.log('database port 5000');
})