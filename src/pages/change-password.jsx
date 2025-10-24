import { useState, useEffect } from 'react'
import bcrypt from 'bcryptjs'
import { useActionData, useSubmit } from '@remix-run/react'
import { toast } from 'sonner'
import { getUser } from '@/lib/auth'
import { query } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export async function loader({ request }) {
  const user = await getUser(request)
  if (!user) {
    throw new Response('Unauthorized', { status: 401 })
  }
  return { user }
}

export async function action({ request }) {
  const user = await getUser(request)
  if (!user) {
    return { success: false, message: 'Unauthorized' }
  }

  try {
    const formData = await request.formData()
    const currentPassword = formData.get('currentPassword')
    const newPassword = formData.get('newPassword')
    const confirmPassword = formData.get('confirmPassword')

    if (newPassword !== confirmPassword) {
      return { success: false, message: 'New passwords do not match' }
    }

    if (newPassword.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' }
    }

    // Verify current password
    const [users] = await query('SELECT password_hash FROM users WHERE id = ?', [user.id])
    if (users.length === 0) {
      return { success: false, message: 'User not found' }
    }

    const isCurrentValid = await bcrypt.compare(currentPassword, users[0].password_hash)
    if (!isCurrentValid) {
      return { success: false, message: 'Current password is incorrect' }
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10)
    const newPasswordHash = await bcrypt.hash(newPassword, salt)

    // Update password
    await query('UPDATE users SET password_hash = ? WHERE id = ?', [newPasswordHash, user.id])

    return { success: true, message: 'Password changed successfully' }
  } catch (error) {
    return { success: false, message: 'An error occurred while changing password' }
  }
}

export default function ChangePassword() {
  const actionData = useActionData()
  const submit = useSubmit()
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        toast.success(actionData.message)
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      } else {
        toast.error(actionData.message)
      }
    }
  }, [actionData])

  const handleSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    submit(fd, { method: 'post' })
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className='container mx-auto px-4 pb-10 max-w-md'>
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Label htmlFor='currentPassword'>Current Password</Label>
              <Input
                id='currentPassword'
                name='currentPassword'
                type='password'
                value={formData.currentPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor='newPassword'>New Password</Label>
              <Input
                id='newPassword'
                name='newPassword'
                type='password'
                value={formData.newPassword}
                onChange={handleChange}
                minLength={6}
                required
              />
            </div>
            
            <div>
              <Label htmlFor='confirmPassword'>Confirm New Password</Label>
              <Input
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                value={formData.confirmPassword}
                onChange={handleChange}
                minLength={6}
                required
              />
            </div>
            
            <Button type='submit' className='w-full'>
              Change Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}