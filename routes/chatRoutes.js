import { getChatsById,createChat,sendMsg,getMsgs } from "../controllers/chatController.js"
import { checkId, checkString,checkStringArray } from "../helper.js"

import express from 'express'
import xss from 'xss'
const router = express.Router();


router.get('/',async (req,res)=>{
    // try{
     if(!req.session.user) return res.redirect('/')
    
    let userId = req.session.user.id
    userId = checkId(userId)


    
    const chats = await getChatsById(userId)
    console.log("chats ",chats)
    
    if(chats.length > 0){
    res.status(200).json({msg:'Success',data:chats})
    }
    else{
        res.status(404).json({msg:'No Chats Found'})
    }
    // }
    // catch(err){
        // res.status(500).json({msg:err.msg})
    // }

}
)

router.post('/',async(req,res)=>{
    try{
       
        let {chatName,participants} = req.body
        chatName = xss(chatName)
        participants = checkStringArray(participants,'participants')
        for (let i in participants){
            checkId(participants[i])
        }
  
        
        let userId = req.session.user.id
        userId = checkId(userId)
        const resp = await createChat(userId,chatName,participants)
        console.log("RESP ",resp)
        res.status(201).json({msg:'Resource Created',data:resp,isSuccess:true})

    }
    catch(err){
        res.status(500).json({msg:err})

    }
}
)

router.get('/:chatId/messages',async (req,res)=>{

    let chatId = req.params.chatId
    chatId = checkId(chatId)
    const resp = await getMsgs(chatId)
    res.status(200).json({data:resp})
})
router.post('/:chatId/messages',async (req,res)=>{
  
try{
    let chatId = req.params.chatId
    let senderId = req.session.user.id
    chatId = xss(chatId)
    senderId = xss(senderId)

    chatId = checkId(chatId)
    senderId = checkId(senderId)
   
    let {msgContent} = req.body
    msgContent = xss(msgContent)
    msgContent = checkString(msgContent,'Message')

    const io = req.app.get('io');

    const resp = await sendMsg(msgContent,senderId,chatId,io)

    
    res.status(200).json({data:'done'})
}
catch(e){
    console.log("eee ",e)
    res.status(500).json({isSuccess:false,msg:e})
}
})






export default router
