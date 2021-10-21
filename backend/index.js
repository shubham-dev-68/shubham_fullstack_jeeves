require("dotenv").config();

const cors = require("cors");
const express = require("express")
const app = express();
const port = process.env.PORT || 5000;
const {sequelize} = require('./models')
var bodyParser = require('body-parser')
const path = require("path")


app.use(cors()); //for no domain restriction
app.use(express.json()); // for parsing application/json
app.use(express.static(path.join(__dirname, "/property_image")));

// initalize routes
require("./routes")(app);

app.listen(port, () => {
  console.log("Server is up on port " + port);
  // sequelize sync force true for the time being to clear the models till its finalized
  // sequelize.sync({ "force": true });
  // sequelize.sync({ "alter": true });
  sequelize.sync();
});