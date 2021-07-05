import express from 'express';

const app = express();

// 요청 응답
app.get('/sky/:id', (req, res, next) => {
  //   console.log(req.path);
  //   console.log(req.headers);
  // res.send('hello');
  console.log(req.params); // {id : '1'}
  console.log(req.params.id); // http://localhost:8080/sky/1 => 1
  console.log(req.query); // http://localhost:8080/sky/1?keyword=hello => {keyword:'hello'}
  console.log(req.query.keyword); // hello

  // res
  // res.json({ name: 'jh' }); json 형태로 보내기
  res.setHeader('key', 'value');
  res.status(201).send('Created');
});

app.listen(8080);
// IP
// Port
