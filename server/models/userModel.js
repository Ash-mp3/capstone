const client = require("../config/database");

const insertUser = async (userData) => {
    try {
    const checkDoupQuery = `
            SELECT * FROM users WHERE email = '${userData[1]}'
        `;
    const addUserQuery = `
          INSERT INTO users (username, email, first_name, last_name, phone_number, address, password)
              VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;
      const isDoup = await client.query(checkDoupQuery)
    if (isDoup.rows.length === 0) {
      await client.query(addUserQuery, userData);
      return "User created!";
    } else {
      return "Email already in use.";
    }
  } catch (err) {
    console.log(err);
    return "could not create user";
  }
};

module.exports = { insertUser };
