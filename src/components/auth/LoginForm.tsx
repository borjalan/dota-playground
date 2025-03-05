'use client'

import { Button, Card, Checkbox, Form, Input, Typography } from 'antd'
import { useState } from 'react'

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const onFinish = async (values: { username: string, password: string }) => {
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save user')
      }

      setMessage('User saved successfully!')
    }
    catch (error) {
      console.error('Error saving user:', error)
      setMessage('Error saving user. Please try again.')
    }
    finally {
      setLoading(false)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.error('Failed:', errorInfo)
  }

  return (

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <Card
        style={{ width: 400, borderRadius: 8, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
      >
        <Typography.Title level={3} style={{ textAlign: 'center', marginBottom: '24px' }}>
          Sign Up
        </Typography.Title>

        {/* Message Section */}
        {message && (
          <div
            style={{
              marginBottom: '20px',
              padding: '10px',
              borderRadius: '5px',
              color: message.includes('Error') ? '#cf1322' : '#389e0d',
              backgroundColor: message.includes('Error') ? '#fff1f0' : '#f6ffed',
              border: `1px solid ${message.includes('Error') ? '#ffa39e' : '#b7eb8f'}`,
            }}
          >
            <Typography.Text>{message}</Typography.Text>
          </div>
        )}

        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'Please input your username!' },
              { type: 'email', message: 'Enter a valid email address' },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'Minimum length is 8 characters' },
              { pattern: /[A-Z]/, message: 'Must include an uppercase letter' },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
