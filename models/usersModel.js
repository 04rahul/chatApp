

export default (sequalize,DataTypes)=>{
    
    const users = sequalize.define('users',{
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName:{
        type: DataTypes.STRING,
        
    },
    lastName:{
        type: DataTypes.STRING,
        
    },
    userName:{
        type: DataTypes.STRING,
        
    },
    password:{
        type: DataTypes.STRING,
        
    },

})
return users
}

