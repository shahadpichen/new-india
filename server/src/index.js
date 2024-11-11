const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const verificationRoutes = require("./routes/verification");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/verify", verificationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
