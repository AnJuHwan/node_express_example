import express from 'express';
import fs from 'fs';
import fsAsync from 'fs/promises';
import 'express-async-errors';

/* express-async-errors 라이브러리는 실수로 error 체크 안해줬을 때 
   자동으로 error 처리 해주는 라이브러리다. 
   예제 : async를 붙여주고 return 을 붙여주면 맨 밑에 app.use 에러를 처리해줌
    app.get('/file2', async (req, res) => {
      return fsAsync
      .readFile('/file2.txt')
      .then((data) => res.send(data));
    });
*/ 

/* 1. 프로미스는 비동기적인 방식으로 작동한다.

2. 최하단 에러처리는 동기적으로 작동한다. */

const app = express();

app.use(express.json());

app.get('/file', (req, res) => {
  fs.readFile('/file1.txt', (err, data) => {
    if (err) {
      res.sendStatus(404);
    }
  });
});

app.get('/file1', (req, res) => {
  try {
    const data = fs.readFileSync('/file1.txt');
    res.send(data);
  } catch (error) {
    res.sendStatus(404);
  }
});

app.get('/file2', (req, res) => {
  fsAsync
    .readFile('/file2.txt')
    .then((data) => res.send(data))
    .catch((error) => res.sendStatus(404));
});

app.get('/file3', async (req, res) => {
  try {
    const data = await fsAsync.readFile('/file2.txt');
    res.send(data);
  } catch (error) {
    res.sendStatus(404);
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong' });
});

app.listen(8080);
