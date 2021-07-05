import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

const app = express();

const corsOption = {
  origin: ['http://127.0.0.1:5500'],
  optionsSuccessStatus: 200, // 자동으로 200 응답
  credentials: true, // Access-Control-Allow-Credentials : true
  // 사용자의 정보(token 등)을 헤더에 추가 , 허용가능
};

app.use(express.json());
app.use(cookieParser());
// app.use(morgan('combined'));
app.use(morgan('tiny')); // morgan : 사용자의 요청등 알 수 있음
app.use(helmet()); // 보완에 관련된 헤더들을 설정가능
app.use(cors(corsOption));

// 해당 도메인에서만 사용 가능

app.get('/', (req, res) => {
  console.log(req.body);
  console.log(req.cookies);
  res.send('Welcome!');
});

app.listen(8080);
