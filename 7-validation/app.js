import express from 'express';
import { body, check, param, validationResult } from 'express-validator';

// 유효성 검사

// {
//     "name": "El",
//     "age" : "나이",
//     "job" : {
//         "name" : "DC Academy",
//         "title" : "Instructor"
//     },
//     "email" : "wnghks0531@naver.com"
// }

const app = express();

app.use(express.json());

app.post(
  '/users',
  [
    body('name') //body 의 이름 입력
      .trim() // 입력한 문자열 공백을 다 없애줌 (순서중요)
      .notEmpty() // 값이 비어져있으면 에러
      .withMessage('이름을 입력하세요') // 에러의 메세지
      .isLength({ min: 2 }) // 글자의 길이가 최소 2글자 되어야됨. .isLength({ min: 2 max: 10}) 이렇게도 사용 가능
      .withMessage('이름은 두글자 이상!'),
    body('age')
      .notEmpty()
      .isInt() // Int 형인지 아닌지 검사
      .withMessage('숫자를 입력해주세요'),
    body('email')
      .normalizeEmail() // 이메일 정규화 (이메일 정규표시로 바꿔줌)
      .isEmail() // Email 인지 아닌지 검사
      .withMessage('이메일 입력해요'),
    body('job.name').notEmpty(),
  ],

  (req, res, next) => {
    // validationResult(req): 우리가 등록한 위의 유효성 검사에 에러가 있는지 없는지 확인
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // errors 비어있다면 에러가 없는 것
      // isEmpty() : 값이 비어있는걸 의미함
      return res.status(400).json({ message: errors.array() });
      // json 형태로 errors 을 배열형태로 변환해서 보냄
    }
    console.log(req.body);
    res.sendStatus(201);
  },
);

app.get(
  '/:email',
  param('email') // param 의 관련해서 검사
    .isEmail()
    .withMessage('이메일 입력해요'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 에러 검사를 해줘야 함
      return res.status(400).json({ message: errors.array() });
    }
    res.send('Email');
  },
);

app.listen(8080);

/* 에러 메세지
{
    "message": [
        {
            "value": "E",
            "msg": "이름은 두글자 이상!",
            "param": "name",
            "location": "body"
        },
        {
            "value": "나이",
            "msg": "숫자를 입력해주세요",
            "param": "age",
            "location": "body"
        }
    ]
}
*/
