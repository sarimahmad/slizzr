import moment from "moment";
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

const checkAge = (date) => {
    const birthday = moment(date).format('yyyy/mm/d')
    // it will accept two types of format yyyy-mm-dd and yyyy/mm/dd
	var optimizedBirthday = birthday.replace(/-/g, "/");

	//set date based on birthday at 01:00:00 hours GMT+0100 (CET)
	var myBirthday = new Date(optimizedBirthday);

	// set current day on 01:00:00 hours GMT+0100 (CET)
	var currentDate = new Date().toJSON().slice(0,10)+' 01:00:00';

	// calculate age comparing current date and borthday
	var myAge = ~~((Date.now(currentDate) - myBirthday) / (31557600000));

    if (myAge < 16) {
        return false;
    } else {
        return true;
    }

}
export default {checkEmail,checkPassword,checkUsername, checkAge} 
