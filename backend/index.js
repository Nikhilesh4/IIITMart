require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require('./routes/Userroutes');
const itemRoutes = require("./routes/Items");
const orderRoutes = require("./routes/Orders");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
.connect(process.env.MONGO_URI, {
    ssl: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;

app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/orders", orderRoutes);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
