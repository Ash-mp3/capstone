const client = require("../../config/database");
const bcrypt = require("bcrypt")

const createSaltedPassword = async (plaintextPassword) => {
    const saltRounds = 10;
    try {
      const hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);
      return hashedPassword;
    } catch (error) {
      console.error(error);
      throw error;
    }
};
  
const createUser = async (userInfo) => {
  userInfo[3] = await createSaltedPassword(userInfo[3]);
  console.log('userInfo',userInfo);
  const createUserQuery = `
    INSERT INTO users (first_name, last_name, email, password, username)
      VALUES ($1, $2, $3, $4, $5)
    `;
  const result = await client.query(createUserQuery, userInfo);
  if (result) {
    return { status: 201, msg: "User created successfully!", success: true };
  }
};

module.exports = createUser;
