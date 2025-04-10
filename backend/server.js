const dotenv = require("dotenv").config();
const express = require("express");

const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const imageRoutes = require("./routes/imageRoutes");

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listing on port ${PORT}`));
