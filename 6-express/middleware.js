import express from 'express';

const app = express();

const options = {
  dotfiles: 'ignore', //숨겨진 파일은 보여지지 않도록
  etag: false, //
  index: false,
  maxAge: 'id', // 얼마나 오래동안 캐시가 가능한지
  redirect: false,
  setHeaders: function (res, path, stat) {
    // 필요한 데이터가 있으면 헤더에 추가해서 보낼 수 있음
    res.set('x-timestamp', Data.now());
  },
};

app.use(express.json()); // REST API , body 를 불러올 때
app.use(express.urlencoded({ extended: false })); // HTML Form 에서 submit을 하게되면 데이터를 body 안으로 파싱해줌
app.use(express.static('public', options)); // public 안에 있는 모든 파일들을 불러올 수 있음.
// ex : http://localhost:8080/index.html

app.listen(8080);
