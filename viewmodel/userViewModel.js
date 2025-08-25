const User = require("../models/user");

class UserViewModel {
  async getChat(req) {
    const chat = await User.getChat(req);
    return chat;
  }

  async addMessage(chatId, username, message) {
    // 1. Get old history
    const chatRows = await User.getChat({ query: { id: chatId } });
    if (!chatRows || chatRows.length === 0) throw new Error("Chat not found");

    let historyArray = [];
    try {
      historyArray = JSON.parse(chatRows[0].chat_history);
    } catch (e) {
      console.error("JSON parse error on chat_history:", e);
    }

    // 2. Append new message
    historyArray.push({ username, message });

    // 3. Update DB
    await User.addMessage(chatId, historyArray);

    return historyArray;
  }

}

module.exports = new UserViewModel();
