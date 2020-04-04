const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const formidable = require("express-formidable");

require("dotenv").config({ path: "./utils/.env" });

const ordersRoutes = require("./routes/order");
const productsRoutes = require("./routes/product");
const usersRoutes = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 3001;
const LOCAL_DB_URL = "mongodb://localhost:27017/SCMS";
const DB_URL =
	"mongodb+srv://ahmedfarag:aCQ2okGKqndvPG2E@cluster0-h0r7q.mongodb.net/test?retryWrites=true&w=majority";

mongoose
	.connect(LOCAL_DB_URL, { useNewUrlParser: true })
	.then(() => console.log("Connected to DB.."))
	.catch(err => console.log(err));

app.use(cors());
app.use(formidable());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/orders", ordersRoutes);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);

app.listen(PORT, () => console.log(`Server has started at port ${PORT}...`));
