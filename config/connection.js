const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DB_URI_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Database connection succesful"))
    .catch((err) => console.log("database not connected", err));
