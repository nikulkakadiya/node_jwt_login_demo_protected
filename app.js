const express = require('express');

const app = express();
const morgan = require('morgan');
const tourRoute = require('./routes/tourRoutes');
const usersRoute = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRouts');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public/`));

// app.use((req, res, next) => {
//   console.log('Hello from the middleware');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello World!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.status(200).send('hello this is post method');
// });
// --------------------------------------------------------

// ---------------------------------------------------------------------

// app.get('/api/v1/tours', getAllTours);

// app.get('/api/v1/tours/:id', getById);

// app.post('/api/v1/tours', createTour);

// app.patch('/api/v1/tours/:id', updateTour);

// app.delete('/api/v1/tours/:id', deleteTour);

app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/reviews', reviewRoutes);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Not Found ${req.originalUrl} on this server`,
  // });
  const err = new Error(`Not Found ${req.originalUrl} on this server`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
  next();
});

module.exports = app;
