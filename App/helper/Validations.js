const checkEmail = (email)=>{
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.length == 0 || reg.test(email) === false) {
     
    return false   
    }
    else {
      
     return true
    }
    
}
const checkPassword = (password)=>{
    if (password.length == 0 ||password.length <  5) {
     
    return false   
    }
    else {
      
     return true
    }
    
}
const checkUsername = (username)=>{
    if(username.length==0 ||username.length < 1){
        return false
    }else{
        return true
    }
}
export default {checkEmail,checkPassword,checkUsername} 
