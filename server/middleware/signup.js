//imported modules
const bcrypt = require("bcrypt")

//logger
const logger = require("../config/logger.js")

//database
const { insertUser } = require("../models/userModel.js");


async function createSaltedPassword(plaintextPassword) {
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);
        return hashedPassword;
    } catch (error) {
        logger.error(error);
        throw error; // Rethrow the error for handling in the calling function
    }
}


const signUp = async (info) => {
    try {
        const password = info.password;
        const saltedPassword = await createSaltedPassword(password);
      
        const userData = [];
        for (const key in info) {
            userData.push(info[key]);
        }
        userData[8] = saltedPassword;
        logger.log(info);
        const confirmMsg = await insertUser(userData);
        return { status: 200, res: { msg: confirmMsg } };
    } catch (error) {
        logger.error(error);
        return { status: 500, res: { message: "Error creating user" } };
    }
}

module.exports = signUp