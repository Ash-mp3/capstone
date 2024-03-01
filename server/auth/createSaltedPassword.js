const bcrypt = require("bcrypt")

async function createSaltedPassword(plaintextPassword) {
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = createSaltedPassword