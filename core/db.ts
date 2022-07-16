import mongoose from "mongoose";

mongoose.Promise = Promise;

const mongodb_url = "mongodb://u0traalip2xgd6qopbml:eBtNT7rcVmQmmj1gZR38@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/b9ka0csosjsgzo6?replicaSet=rs0"

mongoose.connect(mongodb_url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

export { db, mongoose }
