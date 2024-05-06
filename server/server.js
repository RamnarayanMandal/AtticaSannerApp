const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");

connectDb(); //calls from config/dbConnection file

const app = express();

app.use(cors());

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRouters"));
app.use("/api/administrators", require("./routes/administratorRoutes"));
app.use("/api/panshopadmin", require("./routes/panShopadminRoutes"));
app.use("/api/forgetPassword", require("./routes/authRoutes"));
app.use("/api/resetPassword", require("./routes/authRoutes"));

//------------------Deployment------------------------------------
if (process.env.NODE_ENV === "production") {
  // Serve static files from the 'client/build' directory
  app.use(express.static(path.join(__dirname, "client", "build")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
//------------------Deployment------------------------------------

app.use("/api/panShopOwner", require("./routes/panShopOwnerRoutes"));

// SuperStockist Signup
app.use("/api/superstockist", require("./routes/superStockistSignupRoutes"));
app.use(
  "/api/superStockistDetails",
  require("./routes/superStockistDetailsRoutes")
);
app.use(
  "/api/superStockistProductDetails",
  require("./routes/superStockistProductDetailsRoutes")
);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port no ${port}`);
});
