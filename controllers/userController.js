const userViewModel = require("../viewmodel/userViewModel");
const userView = require("../view/userView");

class UserController {
  async getChat(req, res) {
    try {
      const chat = await userViewModel.getChat(req);
      res.status(200).send(chat);
    } catch (error) {
      res.status(500).send(error.toString());
    }
  }

  async addMessage(req, res) {
    try {
      const chatId = req.query.id;
      const { username, message } = req.body;

      await userViewModel.addMessage(chatId, username, message);

      res.json({ status: "success", message: "Message added" });
    } catch (err) {
      console.error("Error addMessage:", err);
      res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
  }

}

module.exports = new UserController();
