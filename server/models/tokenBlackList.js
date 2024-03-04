const client = require("../config/database");

const sendToken = async (token, tokenExp) => {
    const sendTokenQuery = `
        INSERT INTO token_blacklist (token, tokenExp)
        VALUES (${token}, ${tokenExp})
    `;

    
}

module.exports = { sendToken }