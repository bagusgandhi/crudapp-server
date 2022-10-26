const mongoose = require('mongoose');

const app = require('./app');
const port = process.env.PORT || 8080;

const DB = process.env.MONGO_URI.replace(
    '<PASSWORD>',
    process.env.MONGO_PASSWORD,
  );

mongoose
  .connect(DB)
  .then(() => console.log('DB successfull connceted!'));

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});
