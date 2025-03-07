const express = require("express");
const cors = require("cors");
const { configDotenv } = require("dotenv");
const fileUpload = require("express-fileupload");
const authRoutes = require("./routes/auth");
const db = require("./config/database");
const cloudinary = require("./config/cloudinary");
const propertyRoutes = require("./routes/property");
const bodyParser = require("body-parser");
configDotenv();

const app = express();

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://property-dekho.vercel.app", // Deployed frontend
];
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://property-dekho.vercel.app",
      "https://property-dekho-siddhant-phulwanis-projects.vercel.app/",
      "https://property-dekho-git-main-siddhant-phulwanis-projects.vercel.app/",
    ],
    credentials: true, // Allow cookies and authentication headers
  })
);

db.connect();
cloudinary.cloudinaryConnect();

app.use("/api/auth", authRoutes);
app.use("/api/property", propertyRoutes);
app.listen(process.env.PORT, () => {
  console.log("server listening on port " + process.env.PORT);
});
