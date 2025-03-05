// app/auth/login/page.tsx

import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'top',
        alignItems: 'top',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <LoginForm />
    </div>
  )
}
