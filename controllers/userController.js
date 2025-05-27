import { sequelize, User } from "../models/index.js"
import {Op} from 'sequelize'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10;

export const login=async(userName,password)=>{

    const user = await User.findOne({
        where:{
            userName
        }
    })
    if(!user){return {'status':404,'msg':'Username does not exists','isSuccess':false}}
    console.log("USER ",password,user.dataValues.password)
    const passwordMatch = await bcrypt.compare(password,user.dataValues.password)
    if (passwordMatch){
        
        let user_info = {
            firstName:user.dataValues.firstName,
            lastName:user.dataValues.lastName,
            userName:user.dataValues.userName
        }
        return {'status':200,'data':user.dataValues,'msg':'Logged in','isSuccess':true}
    }
    return {'status':401,'msg':'Username or Password is incorrect','isSuccess':false}
      

}

export const register = async (firstName,lastName,userName,password)=>{
    const user = await User.findOne(({
        where :{
            userName
        }
    }))
    if(user) return {'isSuccess':false,'msg':'Username Already exisits.','status':409}
    password = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await User.create({firstName,lastName,userName,password})
    return {'isSuccess':true,'status':201,'msg':'Resource created sucessfully'}


}

export const getUsers = async() =>{
    const allUsers = await User.findAll({})
    return allUsers
}

export const getOtherUsers= async (userId)=>{
    const users = await User.findAll({
        where:{
            id:{
                [Op.ne]: userId
            }
        }
    })
    return users
}
export const getUser = async(userName) =>{
    const user = await User.findOne({userName})
    return user
}