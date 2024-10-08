'use client'
import { useState } from 'react'

// Components
import { Button, Flex, Layout, Menu, theme } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import Title from 'antd/es/typography/Title'

// Icons
import DotaIcon from '@/icons/DotaIcon'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons'

interface Props {
  children: React.ReactNode
}

export default function RootLayoutClient({ children }: Readonly<Props>) {
  const [collapsed, setCollapsed] = useState(false)
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken()
  return (
    <Layout
      style={{
        minHeight: '100vh',
        background: colorBgContainer,
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Flex
          align="center"
          justify="center"
          gap={2}
          style={{
            height: '64px',
            background: 'rgba(0, 0, 0, 0.85)',
            overflow: 'hidden',
          }}
        >
          <DotaIcon sx={{
            h: '100px',
            color: 'red',
          }}
          />
          <Title
            level={5}
            style={{
              color: 'white',
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              maxWidth: collapsed ? '0' : '200px',
              opacity: collapsed ? 0 : 1,
              transition: 'opacity 0.2s ease-in-out, max-width 0.1s ease-in-out',
            }}
          >
            Dota Playground
          </Title>
        </Flex>
        <Menu
          theme="dark"
          mode="inline"
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Héroes',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
