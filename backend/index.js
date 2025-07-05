const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();


connectDB();

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/auth", require("./routes/auth"));
app.use("/api/restaurants", require("./routes/restaurant"));
app.use("/api/menu", require("./routes/menu"));
app.use("/api/orders", require("./routes/order"));
app.use("/api/reviews", require("./routes/review"));
app.use("/api/feedback", require("./routes/feedback"));


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
