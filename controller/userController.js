const bcrypt=require ('bcrypt');
const jwt=require('jsonwebtoken');
const{Op}=require('sequelize');
const User=require('../models/User');
const secretKey= 'your-secret-key';   //replace with a strong secret key

const userController={
    register:async(req,res)=>{
        try{
            const {username, password}=req.body;
            const hashedPassword=await bcrypt.hash(password,10);
            const user = await User.create({username,password:hashedPassword});
            res.status(201).json({message:'Registartion successful', user});

        }
        catch (error){
            res.status(500).json({error:'failed to register user'});

        }
    },

    login: async (req, res)=>{
        try{
            const {username, password}=req.body;
            const user=await User.findOne({where:{username}});

            if (!user) {
                return res.status(401).json({error:'user not found'});
            }

            const isPasswordValid= await bcrypt.compare(password, user.password);

            if(!isPasswordValid) {

                return res.status(401).json({error:'invalid password'});

            }

            const token=jwt.sign({id:user.id, role:user.role}, secretKey,{
                expiresIn: '1h',
            });

            res.status(200).json({message:'login successful', token});
            
        }   catch(error){
            res.status(500).json({error:'failed to login'})
        }    
    },
    getAllUsers: async(req,res)=>{
        try{
            const users=await User.findAll({attributes:['id', 'username','role']});
            req.status(200).json('users');
        } catch (error) {
            res.status(500).json({error:'failed to retrieve users'});
        }
    },
};

module.exports=userController;