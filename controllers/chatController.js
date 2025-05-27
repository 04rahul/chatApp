import { User,Chat,Message } from "../models/index.js";
export const getChatsById = async(userId) =>{
    
    
    const user = await User.findByPk(userId)
    

    const chats = await user.getChats()
    
    // const chats = await Chat.findAll({
    //   include: [{
    //     model: User,
    //     where: { id: userId },
    //   }]
    // });
     return chats
    
   
    
   
   
}

export const createChat = async(userId,chatName,participants) =>{
    
    participants.push(userId)
    
    const newChat = await Chat.create({
        chatName:chatName
    })
     let resp = await newChat.addUsers(participants)
     
    return newChat


}


export const sendMsg = async(msgContent,senderId,chatId,io)=>{
    const newMsg = await Message.create({
        msgContent,senderId,chatId
    })
    const user = await User.findByPk(senderId)
    let userName = user.userName

    io.to(`chat_${chatId}`).emit('new_message', {
      chatId,
      senderId,
      msgContent,
      userName
    });
    return newMsg
}

export const getMsgs = async(chatId)=>{
    
    console.log("CHATTT ",chatId)
    const msgs = await Message.findAll({
        where:{
            chatId
        },
        include:{
            model:User,
            attributes:['id','userName']
        }
    })
    return msgs
}