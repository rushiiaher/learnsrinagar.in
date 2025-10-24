import bcrypt from 'bcryptjs';

const hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';
const password = 'password';

console.log('Testing password verification...');
console.log('Hash:', hash);
console.log('Password:', password);

bcrypt.compare(password, hash)
  .then(result => {
    console.log('Result:', result);
    console.log(result ? 'SUCCESS: Password matches!' : 'FAILED: Password does not match!');
  })
  .catch(err => {
    console.error('Error:', err);
  });