const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.route");
const noteRoutes = require("./routes/note.route");

const connectToDb = () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/notepad");
    console.log("connected to db");
  } catch (error) {
    console.log("failed to conncet to db", error);
    process.exit();
  }
};

connectToDb();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
