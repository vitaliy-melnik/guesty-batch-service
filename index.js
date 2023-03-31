const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require('./swagger/options');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use((req, res, next) => {
  res.restJson = (data) => res.json(data);
  next();
})

const specs = swaggerJsdoc(swaggerOptions);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

app.use('/', require('./app/v1'));

module.exports = app;