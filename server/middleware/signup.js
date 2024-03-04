//imported modules
const bcrypt = require("bcrypt")

//database
const { insertUser } = require("../models/userModel.js");


async function createSaltedPassword(plaintextPassword) {
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error for handling in the calling function
    }
}


async function signUp(info){
    try {
        const password = info.password;
        const saltedPassword = await createSaltedPassword(password);
      
        const userData = [];
        for (const key in info) {
            userData.push(info[key]);
        }
      
        const confirmMsg = await insertUser(userData);
        return { status: 200, res: { msg: confirmMsg } };
    } catch (error) {
        console.error(error);
        return { status: 500, res: { message: "Error creating user" } };
    }
}

module.exports = signUp