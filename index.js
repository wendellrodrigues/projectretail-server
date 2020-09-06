const express         = require ('express');
const routes          = require('./routes/routes')

const app       = express();


//Routes PATH
app.use('/routes', routes);

app.listen(5000, () => {
  console.log(`App is listening on PORT ${5000}`)
});