const mongoose = require('mongoose');

//console.log(process.env.DATABASE_URL)

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection;

//Check if logged into db
db.on('connected', function() {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.pot}`)
});