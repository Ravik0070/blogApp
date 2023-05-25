import { checkUser } from "../dbOperations.js";
export const register = async (req,res)=>{
   let a = await checkUser(req.body.email,req.body.username);
    if(a.length > 0 ){
        let b = Array.isArray(a)
        if(b){
            return res.json("data is here ")
        }
        else{
            return res.json("something wrong with  database"+b)
        }
    }
    else{
        return res.json("data is not here")
    }

}
export const login = (req,res)=>{

}
export const logout = (req,res)=>{

}