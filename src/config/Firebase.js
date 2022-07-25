const initializeApp = require("firebase/app").initializeApp;
const getStorage = require("firebase/storage").getStorage;

require("dotenv/config");

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STOREGE_BUCKET,
  messagingSenderId: process.env.MESSAGIN_SENDER_ID,
  appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.export = app;
