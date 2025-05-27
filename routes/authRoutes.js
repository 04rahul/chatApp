import {login,register} from '../controllers/userController.js'
import router from './chatRoutes.js'
import { checkPassword, checkString } from '../helper.js'
import xss from 'xss'


router.post('/login',async(req,res)=>{
try{
    let userName = req.body.userName
    let password = req.body.password
    userName =xss(userName)
    password = xss(password)

    userName = checkString(userName,'username')
    password = checkString(password,'password')
    checkPassword(password)
    const resp = await login(userName,password)
    if (resp.status == 200){
    req.session.user = resp.data
    }
   

    
    res.status(resp.status).json(resp)
}
catch(e){
    res.status(500).json({msg:e,isSuccess:false})
}
})



router.post('/register',async (req,res)=>{
    try{
    let {firstName,lastName,userName,password} = req.body


firstName = xss(firstName)
lastName = xss(lastName)
userName = xss(userName)
password = xss(password)
firstName = checkString(firstName,'First name')
lastName = checkString(lastName,'Last name')
userName = checkString(userName,'username')
password = checkString(password,'password')
checkPassword(password)


const resp = await register(firstName,lastName,userName,password)
console.log(resp.msg)

   

    if (resp.isSuccess){res.status(201).json(resp)}
    else{(res.status(resp.status).send(resp))}

    }
    catch(e){
        res.status(500).json({msg:e,isSuccess:false})
    }

})

router.post('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/')
})

export default router