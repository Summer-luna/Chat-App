const { db } = require("../db");
const createMessageTable = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "CREATE TABLE messages ( message_id int primary key auto_increment, user_id int, messages_content varchar(255) not null, message_date datetime not null, foreign key (user_id) references users(user_id));",
      (err, res) => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};

const saveMessage = (data) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO messages (user_id, message_content, message_date) VALUES (?,?,NOW())",
      [data.user_id, data.message_content],
      (err, res) => {
        if (err) reject(false);

        if (res) {
          resolve(true);
        } else {
          reject(false);
        }
      }
    );
  });
};

const getAllMessages = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT messages.message_id, messages.user_id, messages.message_content, messages.message_date, users.user_display_name, users.user_avatar_url FROM messages INNER JOIN users on messages.user_id=users.user_id ORDER BY messages.message_date ASC",
      (err, row) => {
        if (err) {
          reject(false);
        } else {
          if (row) {
            resolve(row);
          } else {
            resolve(false);
          }
        }
      }
    );
  });
};

const getCurrentUserMessages = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT messages.message_id, messages.user_id, messages.message_content, messages.message_date, users.user_display_name, users.user_avatar_url FROM messages INNER JOIN users on messages.user_id=users.user_id AND messages.user_id=? ORDER BY messages.message_date ASC",
      id,
      (err, res) => {
        if (err) reject(false);
        if (res.length > 0) {
          resolve(res);
        } else {
          reject(false);
        }
      }
    );
  });
};

module.exports = {
  createMessageTable: createMessageTable,
  saveMessage: saveMessage,
  getAllMessages: getAllMessages,
  getCurrentUserMessages: getCurrentUserMessages,
};
