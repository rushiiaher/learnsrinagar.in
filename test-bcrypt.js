import bcrypt from 'bcryptjs';

const testHash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';
const testPassword = 'password';

bcrypt.compare(testPassword, testHash).then(result => {
    console.log('Password match:', result);
}).catch(err => {
    console.error('Error:', err);
});