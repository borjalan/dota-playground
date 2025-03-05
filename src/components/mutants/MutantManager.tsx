'use client'
import type { Mutant } from '@/types/mutant'
import type moment from 'moment'
import { speciesOptions } from '@/constants/species'
import { Alert, Button, DatePicker, Form, Input, List, Select, Spin, Typography } from 'antd'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function MutantManager() {
  const [mutants, setMutants] = useState<Mutant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form] = Form.useForm()

  // Fetch mutants from GET endpoint
  useEffect(() => {
    const fetchMutants = async () => {
      try {
        const response = await fetch('/api/mutants')
        if (!response.ok)
          throw new Error('Failed to fetch mutants')
        const data = await response.json()
        setMutants(data)
      }
      catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      }
      finally {
        setLoading(false)
      }
    }

    fetchMutants()
  }, [])

  // Handle form submission to POST endpoint
  const handleSubmit = async (values: {
    name: string
    powers: string
    species: string
    firstAppearance: moment.Moment
  }) => {
    try {
      setLoading(true)
      const response = await fetch('/api/mutants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          powers: values.powers.split(',').map(p => p.trim()),
          firstAppearance: values.firstAppearance.year() ?? new Date().getFullYear(),
          species: values.species,
          isAlive: true,
        }),
      })

      if (!response.ok)
        throw new Error('Failed to create mutant')

      const newMutant = await response.json()
      setMutants([...mutants, newMutant])
      form.resetFields()
      setError('')
    }
    catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create mutant')
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Typography.Title level={2} style={{ marginBottom: 24 }}>
        There is no way to run chat
      </Typography.Title>

      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      {/* Mutants List */}
      <Spin spinning={loading}>
        <List
          itemLayout="horizontal"
          dataSource={mutants}
          renderItem={mutant => (
            <List.Item>
              <List.Item.Meta
                avatar={(
                  <Image
                    src="/images/mutants/default-mutant.jpg"
                    alt="Mutant"
                    width={80}
                    height={80}
                    style={{ borderRadius: 8, objectFit: 'cover' }}
                  />
                )}
                title={mutant.name}
                description={(
                  <>
                    <div>
                      Powers:
                      {' '}
                      {mutant.powers.join(', ')}
                    </div>
                    <div>
                      Species:
                      {' '}
                      {mutant.species}
                    </div>
                    <div>
                      First Appearance:
                      {' '}
                      {mutant.firstAppearance}
                    </div>
                  </>
                )}
              />
            </List.Item>
          )}
        />
      </Spin>

      {/* Add Mutant Form */}
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        style={{ marginTop: 24 }}
      >
        <Form.Item
          label="Mutant Name"
          name="name"
          rules={[{ required: true, message: 'Please input the mutant name!' }]}
        >
          <Input placeholder="Enter mutant name (e.g., Wolverine)" />
        </Form.Item>

        <Form.Item
          label="Powers (comma-separated)"
          name="powers"
          rules={[{ required: true, message: 'Please list at least one power!' }]}
        >
          <Input placeholder="Enter powers (e.g., Regeneration, Claws)" />
        </Form.Item>

        <Form.Item
          label="Species"
          name="species"
          initialValue="Mutant"
          rules={[{ required: true, message: 'Please specify species!' }]}
        >
          <Select
            options={speciesOptions}
            placeholder="Select species"
          />
        </Form.Item>

        <Form.Item
          label="First Appearance"
          name="firstAppearance"
          rules={[{ required: true, message: 'Please select a year!' }]}
        >
          <DatePicker
            picker="year"
            style={{ width: '100%' }}
            placeholder="Select year"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Add Mutant
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
