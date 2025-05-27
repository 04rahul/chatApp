import { DataTypes, Sequelize } from "sequelize"
import ChatsModel from "./chatsModel.js"
import usersModel from "./usersModel.js"
import MessageModel from '../models/messagesModel.js'


const sequelize = new Sequelize('postgres://postgres:postgres@127.0.0.1:5432/chatApp')
const User = usersModel(sequelize,DataTypes)
const Chat = ChatsModel(sequelize,DataTypes)
const Message = MessageModel(sequelize,DataTypes)

User.belongsToMany(Chat,{through:'UserChatsRef',foreignKey:'userId',otherKey:'chatId'})
Chat.belongsToMany(User,{through:'UserChatsRef',foreignKey:'chatId',otherKey:'userId'})

Chat.hasMany(Message,{foreignKey:'chatId'})
Message.belongsTo(Chat,{foreignKey:'chatId'})
Message.belongsTo(User,{foreignKey:'senderId'})
// await sequelize.sync({ alter: true,force:true });

export{
    sequelize,User,Chat,Message
}