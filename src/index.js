const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

routes(app);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});

module.exports = app;
