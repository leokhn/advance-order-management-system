
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

// Setting up for socket.io
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
global.io = io;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/users", require("./routes/user.controllers"));
app.use("/products", require("./routes/product.controllers"));
app.use("/productdetails", require("./routes/productdetail.controllers"));
app.use("/orders", require("./routes/order.controllers"));

server.listen(5000, () => console.log(`Server is listening on PORT: 5000`));
module.exports = app;