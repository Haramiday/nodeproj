const express = require('express');
const app = express();
const Router = require("./routes")
const mongoose = require('mongoose')

app.use(express.json())

//connect to database
mongoose.connect('mongodb+srv://haramiday:test12345@cluster0.ie6pw.mongodb.net/firstdb?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// ...
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


// ...
app.use(Router);

//listen
app.listen(3000 ,() => {
	console.log("Server is running at port 3000");
  });