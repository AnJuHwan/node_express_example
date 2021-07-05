import express from 'express';

const app = express();

// postman 으로 body에 post로 넘겨주면 body부분에 데이터가 들어옴
app.use(express.json());
app.post('/', (req, res, next) => {
  console.log(req.body);
});

app.get('/file', (req, res) => {
  fs.readFile('/file1.txt', (err, data) => {
    if (err) {
      res.sendStatus(404);
    }
  });
});

app.get('/file', (req, res) => {
  const data = fs.readFileSync('/file1.txt');
  res.send(data);
});

app.get('/file2', (req, res) => {
  fsAsync
    .readFile('/file1.txt') //
    .then((data) => res.send(data));
});

app.get('/file3', (req, res) => {
  const data = await fsAsync.readFile('/file2.txt');
  res.send(data);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong' });
});

app.listen(8080);
// IP
// Port
