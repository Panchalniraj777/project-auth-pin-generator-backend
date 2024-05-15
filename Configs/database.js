const mongoose = require('mongoose');
const dbName = process.env.DB_NAME;

console.log("dbName", dbName);
console.log("process.env.MONGODB_URL", process.env.MONGODB_URL);

//BUILD A CONNECTION
mongoose
  .connect(process.env.MONGODB_URL, {
    dbName,
  })
  .then(() => {
    console.log(
      chalk.greenBright(
        `${chalk.white.bold(dbName)} database connected successfully ${chalk.yellow.bold(':)')} \n`
      )
    );
  })
  .catch(err => console.log('error', err));

module.exports.mongoose = mongoose;
