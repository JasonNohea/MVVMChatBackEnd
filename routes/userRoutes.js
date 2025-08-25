const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const cors = require("cors");

const allowedOrigins = [
    "http://127.0.0.1:8000",
];

router.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
            // Sentry.captureException(new Error("Not allowed by CORS"));
        }
    }
}));

/*
    CRUD Example
*/

// Get chat history by chat_id
router.get("/chat", userController.getChat);
// Append new message
router.post("/chat", userController.addMessage);

// router.get("/users", userController.getAllUsers);
// router.get("/users/:id", userController.getUserById);
// router.post("/users", userController.createUser);
// router.delete("/users/:id", userController.deleteUser);

module.exports = router;
