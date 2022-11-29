const { db } = require("../db");
const bcrypt = require("bcryptjs");

const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    const matchEmail = await findUserByEmail(data.email);

    if (matchEmail) {
      reject(
        `This user email, ${data.email}, has already exist. Please choose different email.`
      );
    } else {
      let salt = bcrypt.genSaltSync(10);
      let encryptedPassword = bcrypt.hashSync(data.password, salt);
      db.query(
        "INSERT INTO users (user_email, user_password, user_display_name, user_avatar_url) VALUES (?,?,?,?)",
        [data.email, encryptedPassword, data.displayName, data.avatar],
        (err, rows) => {
          if (err) {
            reject(false);
          }
          resolve("New user has been created successfully.");
        }
      );
    }
  });
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE user_email = ?",
      [email],
      (err, rows) => {
        if (err) {
          reject(false);
        } else {
          if (rows) {
            resolve(rows[0]);
          } else {
            resolve(false);
          }
        }
      }
    );
  });
};

const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE user_id = ?", [id], (err, rows) => {
      if (err) {
        reject(err);
      }

      if (rows) {
        resolve(rows[0]);
      } else {
        resolve(false);
      }
    });
  });
};

const updateDisplayName = (name, id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users SET user_display_name=? WHERE user_id=?",
      [name, id],
      (err, res) => {
        if (err) reject(false);
        resolve(true);
      }
    );
  });
};
const updateAvatar = (avatar, id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users SET user_avatar_url=? WHERE user_id=?",
      [avatar, id],
      (err, res) => {
        if (err) reject(false);
        resolve(true);
      }
    );
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SET FOREIGN_KEY_CHECKS=0; DELETE FROM users WHERE user_id=?; SET FOREIGN_KEY_CHECKS=1;",
      [id],
      (err, res) => {
        if (err) {
          reject(false);
        }
        resolve(true);
      }
    );
  });
};

module.exports = {
  findUserByEmail: findUserByEmail,
  findUserById: findUserById,
  createNewUser: createNewUser,
  updateDisplayName: updateDisplayName,
  updateAvatar: updateAvatar,
  deleteUser: deleteUser,
};
