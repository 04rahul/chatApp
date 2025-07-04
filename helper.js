import  validator  from "validator";

let checkId = (id)=>{
    id = checkString(id,'id')
    if(!validator.isUUID(id)){throw 'Not a Valid UUID'}
    return id

    
}

let isValidString =(inputStr)=>{
    if (typeof inputStr !== 'string'){return false}
    else if (inputStr.trim().length === 0){return false}
    else {
        return true
    }
}

let checkString=(strVal, varName) =>{
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  }

  let checkPassword=(strVal)=>{
    if(strVal.length < 8 ) throw `Error: Password must be of 8 characters minimum`
    const password_regex =  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if(!password_regex.test(strVal)){
        throw `Invalid Password format Password . Password must contain at least one number and there has to be at least one special character`
    }
  }

  let checkStringArray = (arr, varName) => {
    //We will allow an empty array for this,
    //if it's not empty, we will make sure all tags are strings
    if (!arr || !Array.isArray(arr))
      throw `You must provide an array of ${varName}`;
    if(arr.length===0) throw `${varName} cannot be empty`;
    for (let i in arr) {
      if (typeof arr[i] !== 'string' || arr[i].trim().length === 0) {
        throw `One or more elements in ${varName} array is not a string or is an empty string`;
      }
      arr[i] = arr[i].trim();
    }

    return arr;
  }
export {isValidString,checkPassword,checkString,checkStringArray,checkId}