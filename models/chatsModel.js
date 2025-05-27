export default (sequalize,DataTypes)=>{

const Chat = sequalize.define('Chat',{
    chatId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    chatName:{
        type: DataTypes.STRING,
        
    }
    
   
   

})
return Chat
}
