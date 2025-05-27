import express from 'express'
import {getUsers,getUser,getOtherUsers} from '../controllers/userController.js'
import chatRoutes from '../routes/chatRoutes.js'
import authRoutes from '../routes/authRoutes.js'
import { checkId } from '../helper.js'
import xss from 'xss'


const router = express.Router()

router.get('/',(req,res)=>{
    // res.send("Hello World!")
    res.render('index')
})

router.get('/home',(req,res)=>{

    if(!req.session.user) return res.redirect('/')
    
    res.render('home',{user:req.session.user})
})

router.get('/create-chat-page',(req,res)=>{
    if(!req.session.user) return res.redirect('/')

   
    res.render('create-chat',{user:req.session.user})
})




router.get('/users',async(req,res)=>{ 
    let userId = req.session.user.id
    userId = xss(userId)
    userId = checkId(userId)

    
    const resp = await getOtherUsers(userId)
    res.status(200).json({data:resp})

})

// router.get('/users/:username',async(req,res)=>{ 
//     const {username} = req.params
    
//     const resp = await getUser(username)
//     res.send(resp)

// })



router.use('/',authRoutes)

// Chats
router.use('/chats',chatRoutes)



export default router