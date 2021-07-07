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

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next(); // 에러가 없다면 다음 미들웨어(42번째줄 req,res,next)로 넘어감
  }
  return res.status(400).json({ message: errors.array() });
  /* 
  첫번째 배열에 있는 메세지만 받아옴 
  res.status(400).json({ message: errors.array()[0].msg });
  */
};

app.post(
  '/users',
  [
    body('name')
      .notEmpty()
      .withMessage('이름을 입력하세요')
      .isLength({ min: 2 })
      .withMessage('이름은 두글자 이상!'),
    body('age').notEmpty().isInt().withMessage('숫자를 입력해주세요'),
    body('email').isEmail().withMessage('이메일 입력해요'),
    body('job.name').notEmpty(),
    validate,
  ],

  (req, res, next) => {
    console.log(req.body);
    res.sendStatus(201);
  },
);

app.get(
  '/:email',
  [param('email').isEmail().withMessage('이메일 입력해요'), validate],
  (req, res, next) => {
    res.send('Email');
  },
);

app.listen(8080);
