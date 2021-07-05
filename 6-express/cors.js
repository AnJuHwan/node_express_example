import express from 'express';
import cors from 'cors';

const app = express();

// app.use((req, res, next) => {
//   // ip 가 다른곳에서는 데이터를 공유할 수 없음.
//   // header 에서 Access-Control-Allow-Origin 을 이용해서 접근할 수 있음
//   res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'OPTIONS , GET , POST , PUT , DELETE',
//   );
//   next();
// });

// app.use(cors());
// npm i cors 라이브러리를 쓰면 간편하게 가능 (아무대서나 접근 가능)

app.use(
  cors({
    origin: ['http://127.0.0.1:5500'],
    optionsSuccessStatus: 200, // 자동으로 200 응답
    credentials: true, // Access-Control-Allow-Credentials : true
    // 사용자의 정보(token 등)을 헤더에 추가 , 허용가능
  }),
);
// 해당 도메인에서만 사용 가능

app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.listen(8080);
