import bcrypt from 'bcryptjs';
import { json } from '@remix-run/node';
import { query } from '@/lib/db';

export async function action({ request }) {
  const form = await request.formData();
  const email = form.get('email');
  const password = form.get('password');

  console.log('=== TEST LOGIN START ===');
  console.log('Email:', email);
  console.log('Password:', password);

  const [users] = await query('SELECT * FROM users WHERE email = ?', [email]);
  console.log('Users found:', users.length);

  if (users.length > 0) {
    const user = users[0];
    console.log('User hash:', user.password_hash);
    
    const isValid = await bcrypt.compare(password, user.password_hash);
    console.log('Password valid:', isValid);
    
    return json({ 
      success: isValid,
      message: isValid ? 'Login successful' : 'Invalid password',
      userFound: true,
      hash: user.password_hash
    });
  }

  return json({ 
    success: false, 
    message: 'User not found',
    userFound: false 
  });
}

export default function TestLogin() {
  return (
    <div className="p-8">
      <h1>Test Login</h1>
      <form method="post">
        <div className="mb-4">
          <label>Email:</label>
          <input name="email" type="email" defaultValue="super_admin@gmail.com" className="border p-2 ml-2" />
        </div>
        <div className="mb-4">
          <label>Password:</label>
          <input name="password" type="password" defaultValue="password" className="border p-2 ml-2" />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Test Login</button>
      </form>
    </div>
  );
}