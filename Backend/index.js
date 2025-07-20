require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");

// const passport = require("passport");
const cookieSession = require("cookie-session");
// const passportStrategy = require("./passport");
const authRoute = require("./middleware/auth");
const app = express();
app.use(cookieParser());

// Database Connection
const dbConfig = require("./config/db.config");
const db = require("./helper/db.helper");

// Routes
const webRouter = require("./routes/webRoutes.routes");
const userRouter = require("./routes/user_profile.routes");
// const leadRouter = require("./routes/leads.routes");
// const followupRouter = require("./routes/followup.routes");
// const taskRouter = require("./routes/tasks.routes");
// const documentRouter = require("./routes/documents.routes");

// Set view engine and public directory
// app.set("view engine", "ejs");
// app.set("view", "./view");
app.use("/public", express.static(path.join(__dirname, "public/")));
// app.use('/images', express.static(path.join(__dirname, 'public/images/')));
// app.use('/documents', express.static(path.join(__dirname, 'public/documents/')));

// Middleware
app.use(
  cors({
    origin: "http://10.80.7.90:5173", // frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax", // important for cross-origin
    },
  })
);

// app.use(passport.initialize());
// app.use(passport.session());

// Route middlewares
app.use("/", webRouter);
// app.use("/auth", authRoute.router);
app.use("/api/user", userRouter);
// app.use("/api/lead", leadRouter);
// app.use("/api/followup", followupRouter);
// app.use("/api/task", taskRouter);
// app.use("/api/document", documentRouter);

// Register API routes
app.use("/api/user", require("./routes/user_profile.routes"));

// Start the server
app.get("/", (req, res) => {
  res.send("Welcome to the Skill Connect API!");
});

// Global error handling middleware
// app.use((err, req, res, next) => {
//     err.statusCode = err.statusCode || 500;
//     err.message = err.message || "Internal Server Error";

//     res.status(err.statusCode).json({
//         message: err.message,
//     });
// });

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
