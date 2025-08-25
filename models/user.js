const db = require("../hellpers/service");
const firestore = require("../firebase");

class User {
  static async getChat(req) {
    let id = req.query.id;
    const [rows] = await db.execute("SELECT chat_history FROM chat WHERE chat_id = ?", [id]);
    return rows;
  }

  static async addMessage(chatId, historyArray) {
    const historyString = JSON.stringify(historyArray);
    const mysqlTimestamp = new Date(); // for MySQL DATETIME/TIMESTAMP column
    const epochSeconds = Math.floor(mysqlTimestamp.getTime() / 1000); // for Firestore notifier

    // 1. Update MySQL
    await db.execute(
      "UPDATE chat SET chat_history = ?, chat_timestamp = ? WHERE chat_id = ?",
      [historyString, mysqlTimestamp, chatId]
    );

    // 2. Update Firestore
    await firestore
      .collection("chat")
      .doc(String(chatId))
      .set({ last_timestamp: epochSeconds }, { merge: true });
  }


  // static async fetchAll() {
  //   const [rows] = await db.execute("SELECT * FROM tbl_user");
  //   return rows;
  // }

  // static async findById(id) {
  //   const [rows] = await db.execute("SELECT * FROM tbl_user WHERE id = ?", [
  //     id,
  //   ]);
  //   return rows[0];
  // }

  // static async delById(id) {
  //   const [result] = await db.execute('DELETE FROM tbl_user WHERE id = ?', [id]);
  //   return result.affectedRows;
  // }

  // static async create(user) {
  //   const { name, address, username, password } = user;
  //   const [result] = await db.execute(
  //     "INSERT INTO tbl_user (name, address, username, password) VALUES (?, ?, ?, ?)",
  //     [name, address, username, password]
  //   );
  //   return result.insertId;
  // }
}

module.exports = User;
