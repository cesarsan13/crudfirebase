const functions = require("firebase-functions");
const express = require("express");
const app = express();
app.use(require("./routes/productos.router"));
exports.app = functions.https.onRequest(app);
