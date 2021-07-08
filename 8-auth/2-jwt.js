import jwt from 'jsonwebtoken';

const secret = '}Kae":F#m~w_Hp_5Bs}dG/eM[>!~Q4Er';
// 임의적인 password : password generator 구글링 하면 나옴 (32개)

// jwt.sign : 토큰 생성
const token = jwt.sign(
  {
    // payload : 토큰을 보낼 때 중요한 내용 , 담고싶은 내용을 담으면 됨
    id: 'userId',
    isAdmin: true,
  },
  secret, // 서버에서만 보관하고 있을 키
  { expiresIn: 2 }, // expiresIn : 토큰 만료 시간 (2초)
);

// jwt.verify : 클라이언트에게 전달받은 토큰을 검증
jwt.verify(token, secret, (error, decoded) => {
  console.log(error, decoded);
  // 결과 : null { id: 'userId', isAdmin: true, iat: 1625761673, exp: 1625761675 }
  // iat : 만들어진 시간 , exp : 만료시간
});
// 요기는 잘 나옴

// 하지만 3초이후 다시 실행하게되면 토큰이 만료되어 jwt expired 에러남
// jwt expired : jwt 유효하지 않음
setTimeout(() => {
  jwt.verify(token, secret, (error, decoded) => {
    console.log(error, decoded);
    // error 을 있으면 true 없으면 false로 구분 가능
  });
}, 3000);

console.log(token);
