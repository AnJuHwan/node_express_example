/* 우리가 등록해준 미들웨어에서는 response , next 로 미들웨어를 연결해 줘야함  */

import express from 'express';

const app = express();

// all : baseUrl/api 에서만 호출함
// api 경로에서만 호출함
// /api/* 하면 use와 같이 호출함
app.all('/api', (req, res, next) => {
  console.log('all');
  next();
});

// use : baseUrl/sky/123 등 sky뒤에 더 붙여도 호출함
// sky 을 포함한 어떠한 경로에서도 호출함
app.use('/sky', (req, res, next) => {
  console.log('use');
  next();
});

app.get(
  '/',
  (req, res, next) => {
    console.log('first');
    // next('route'); 다음 라우트로 넘어감 (second)
    // next(new Error('error'));
    // 하나의 콜백에서 두개의 send를 보내면 에러남.
    // return 을 통해서 함수를 빠져나갈 수 있게 해줘야함
    if (true) {
      return res.send('Hello');
    }
    res.send('Hi');

    res.send('Hello');
  },
  (req, res, next) => {
    console.log('first-2');
    next();
  },
);

app.get('/', (req, res, next) => {
  console.log('second');
});

app.use((req, res, next) => {
  res.status(404).send('Not available! @_@');
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('Sorry, try later!');
});

app.listen(8080);
