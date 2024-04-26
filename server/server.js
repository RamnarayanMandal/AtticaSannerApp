const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");




connectDb(); //calls from config/dbConnection file

const app = express();

app.use(cors())

const port = process.env.PORT || 5000;

app.use(express.json())
app.use("/api/contacts", require("./routes/contactRouters"));
app.use("/api/panshopowner", require("./routes/panShopOwnerRouter"));




app.use(errorHandler);




app.listen(port, () => {
    console.log(`Server is running port no ${port}`);
})