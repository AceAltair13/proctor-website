class User{
    constructor(firstName,lastName,phoneNumber,emailId,userName,password){
        this.firstName  =firstName;
        this.lastName  = lastName;
        this.emailId = emailId;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.userName = userName
    }

}
module.exports = User;