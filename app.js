const express = require("express");
const connectdb = require("./config/connectdb");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const app = express();

connectdb()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", require("./routes/userRoutes"));
app.use("/", require("./routes/budgetRoutes"));
app.use(errorHandler)


const port = process.env.PORT;
app.listen(port, () => {
    console.log("Port is listening on", port)
})

