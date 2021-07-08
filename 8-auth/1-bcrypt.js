import bcrypt from 'bcrypt';

const password = 'abcd1234';

const hashed = bcrypt.hashSync(password, 10); // hashSync 동기적 , 길이가 10개인 salt 사용
console.log(`password : ${password}, hashed : ${hashed}`);

// compareSync : 사용자한테 입력받은 패스워드 , 해쉬된 정보
const result = bcrypt.compareSync('abcd1234', hashed);
// compareSync 동기적: 입력한 정보 결과를 확인
console.log(result);
