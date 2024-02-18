// import bcrypt from 'bcryptjs';
// import validator from 'validator';
import supabase from './utils/supabase.js';

// const res = await bcrypt.compare('example1234', '$2a$12$uUJitIu71wiDZC1yL2D7ie0B/ia7d5L1wpS9QT.BSNjSU7J3I93Ja');
// console.log(res);
// console.log(validator.isAlpha('VictorGherardi'));
// console.log(/^[A-Za-z\s]+$/.test(''));
// console.log(/^[^@#$%^]+$/i.test("Lorenzo D'aniello"));
// console.log(/^[^@#$%^]+(?:\s[^@#$%^]+)+$/.test("Lorenzo d'aniello vance Adam"));
// console.log(validator.isEmail('gherardivitor+boo@gmail.com'));
// console.log(validator.isStrongPassword(''));
// { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }

// const hash = 'passwordnuova';
// const token = 'tokennuovo';

// try {
// 	const { data, error } = await supabase
// 		.from('albergatori')
// 		.update({
// 			password: hash,
// 			password_reset_token: null,
// 			password_reset_token_expires: null,
// 			password_changed_at: new Date().toISOString(),
// 		})
// 		.select('*')
// 		.eq('password_reset_token', token)
// 		.gt('password_reset_token_expires', new Date().toISOString());

// 	console.log(data);
// 	console.log(error);

// 	if (error) throw new Error(error);
// } catch (err) {
// 	console.log('ERRORE:');
// 	console.log(err);
// }
