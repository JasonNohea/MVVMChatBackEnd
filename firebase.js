// firebase.js
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // keep the file name you have

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

module.exports = admin.firestore(); // export a ready-to-use Firestore instance
