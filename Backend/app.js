require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const router = require("./routes/book-routes");
const cors = require("cors");
const { getMaxListeners } = require("./model/Book");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/books", router);

// Nodemailer configuration
let transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  secure: false,
});

// Endpoint to handle form submission
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER, // sender's email address
    to: email, // recipient email provided by the user
    subject: "Contact Us Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  let info = await transporter.sendMail({
    from: `"Energy by R.K. Singh" <${process.env.MAIL_USER}>`, // sender address
    to: `${"jaiswalpriyanshu0004@gmail.com"}`, // list of receivers
    subject: "xyz", // Subject line
    html: "xyz", // html body
  });
  res.status(200).send("Email sent: " + info);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(
    "mongodb+srv://jaiswalpriyanshu0004:TMBYYux1585NYrkl@cluster0.ew5t20b.mongodb.net/bookStore"
  )
  .then(() => console.log("Connected to database"))
  .then(() => {
    app.listen(port, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => console.log(err));
