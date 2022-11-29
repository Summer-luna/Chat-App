const bcrypt = require("bcryptjs");
const signUpService = require("./signUpService");

const handleLogin = (data) => {
  return new Promise(async (resolve, reject) => {
    // check user if exists
    const user = await signUpService.findUserByEmail(data.email);

    // if not reject with error message
    if (!user) {
      reject(`This user email ${data.email} does not exits.`);
    } else {
      // if exists, compare hashed entered password with user's in database
      comparePassword(data.password, user).then((result) => {
        if (result === true) {
          resolve(user);
        } else {
          reject("Password is not correct. Please try again.");
        }
      });
    }
  });
};

const comparePassword = async (password, user) => {
  return await bcrypt.compare(password, user.user_password).then((isMath) => {
    if (isMath) {
      return true;
    } else {
      return "The password is not correct, please try again.";
    }
  });
};

module.exports = {
  handleLogin: handleLogin,
  comparePassword: comparePassword,
};
