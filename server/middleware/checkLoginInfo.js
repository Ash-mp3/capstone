function checkLoginInfo(info){ //fields is passed in as array of strings corresponding to the error that need to be checked
    const { username, email, firstName, lastName, phoneNum, address, city, country, password } = info

    let err = false

    //username
    if(username === '' || username === undefined){
    err=true
    }


    //email
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
    const isValidEmail = emailRegex.test(email)
    if(email === '' || email === undefined){
        err=true
    } else if(!isValidEmail){
        err=true
    }


    //first name
    if(firstName === '' || firstName === undefined){
        err=true
    }


    //last name
    if(lastName === '' || lastName === undefined){
    err=true
    }


    //phone number
    const phoneNumRegex = /^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/
    const isValidPhoneNum = phoneNumRegex.test(phoneNum)
    if(phoneNum === '' || firstName === undefined){
        err=true
    } else if(!isValidPhoneNum){
    err=true
    }


    //address
    if(address === '' || address === undefined){
        err=true
    }

    //city
    if(city === '' || city === undefined){
        err=true
    }

    //country
    if(country === '' || country === undefined){
        err=true
    }


    //password must contain more than 8 characters; one uppercase, one lowercase, one number, one special character
    const passwordRegex = /.{8,}/
    const isValidPassword = passwordRegex.test(password)
    if(password === '' || password === undefined){
        err=true
    } else if(!isValidPassword){
        err=true
    }
        
    //set the new error messages and return a boolean based on whether or not there were no errors
    if(err){
        return(false)
    } else {
        return(true)
    }
}

module.exports=checkLoginInfo