import bcrypt from 'bcryptjs';

const res = await bcrypt.compare('example1234', '$2a$12$uUJitIu71wiDZC1yL2D7ie0B/ia7d5L1wpS9QT.BSNjSU7J3I93Ja');
console.log(res);
