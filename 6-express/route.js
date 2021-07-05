import express from 'express';

const app = express();

app.use(express.json());

app
  .route('/posts')
  .get((req, res, next) => {
    res.status(201).send('GET:/posts');
  })
  .post((req, res) => {
    res.status(201).send('POST: /posts');
  });

// 위와 동일

// app.get('/posts', (req, res) => {
//   res.status(201).send('GET:/posts');
// });

// app.post('/posts', (req, res) => {
//   res.status(201).send('POST:/posts');
// });

app
  .route('/posts/:id')
  .put((req, res) => {
    res.status(201).send('PUT: /posts/:id');
  })
  .delete((req, res) => {
    res.status(201).send('DELETE: /posts/:id');
  });

// 위와 동일

// app.put('/posts/:id', (req, res) => {
//   res.status(201).send('PUT: /posts/:id');
// });

// app.delete('/posts/:id', (req, res) => {
//   res.status(201).send('DELETE: /posts/:id');
// });

app.listen(8080);
