const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });
const app = require('./app');
const port = process.env.PORT || 8000;

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
