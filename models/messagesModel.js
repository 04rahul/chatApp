
export default (sequelize,DataTypes)=>{
const Messages = sequelize.define('Messages',{
    msgId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    msgContent:{
        type: DataTypes.STRING,
        
    },
     chatId:{
        type: DataTypes.UUID,
       
        
    },
    senderId:{
        type: DataTypes.UUID,
      
    }

})
return Messages
}
