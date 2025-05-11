const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((connectdb) => {
      console.log("Conncted to MOngoDB successfuly");
      //   console.log(connectdb);

      console.log(
        `Database connected:${connectdb.connection.host} , ${connectdb.connection.name}`
      );
    })
    .catch((err) => {
      console.log("Error on connecting to db", err);
      process.exit(1);
    });
};

module.exports = connectToDB;
