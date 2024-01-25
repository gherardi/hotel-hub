// import bcrypt from 'bcryptjs';
import validator from 'validator';

// const res = await bcrypt.compare('example1234', '$2a$12$uUJitIu71wiDZC1yL2D7ie0B/ia7d5L1wpS9QT.BSNjSU7J3I93Ja');
// console.log(res);
// console.log(validator.isAlpha('VictorGherardi'));
// console.log(/^[A-Za-z\s]+$/.test(''));
// console.log(/^[^@#$%^]+$/i.test("Lorenzo D'aniello"));
// console.log(/^[^@#$%^]+(?:\s[^@#$%^]+)+$/.test("Lorenzo d'aniello vance Adam"));
console.log(validator.isEmail('gherardivitor+boo@gmail.com'));
// console.log(validator.isStrongPassword(''));
// { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }
