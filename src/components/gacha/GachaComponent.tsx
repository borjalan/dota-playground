import { LoadingOutlined } from '@ant-design/icons'
import { Button, Card, Form, Spin } from 'antd'
import React, { useEffect, useState } from 'react'

// Definimos la interfaz para nuestros resultados
interface Result {
  id: number
  name: string
  image: string
}

// Array de resultados posibles
const results: Result[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Resultado ${i + 1}`,
  image: `/placeholder.svg?height=200&width=200&text=Imagen${i + 1}`,
}))

export default function GachaComponent() {
  const [form] = Form.useForm()
  const [spinning, setSpinning] = useState(false)
  const [currentImage, setCurrentImage] = useState('')
  const [finalResult, setFinalResult] = useState<Result | null>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (spinning) {
      interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * results.length)
        setCurrentImage(results[randomIndex].image)
      }, 100)

      // Detener después de 3 segundos y mostrar el resultado final
      setTimeout(() => {
        clearInterval(interval)
        setSpinning(false)
        const finalIndex = Math.floor(Math.random() * results.length)
        setFinalResult(results[finalIndex])
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [spinning])

  const onFinish = () => {
    setSpinning(true)
    setFinalResult(null)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={spinning} className="w-full">
            {spinning ? 'Girando...' : 'Girar'}
          </Button>
        </Form.Item>
      </Form>
      <Card className="mt-4">
        {spinning
          ? (
              <div className="text-center">
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                <img src={currentImage} alt="Cambiando" className="mt-4 mx-auto" style={{ width: 200, height: 200 }} />
              </div>
            )
          : finalResult
            ? (
                <div className="text-center">
                  <img src={finalResult.image} alt={finalResult.name} className="mx-auto" style={{ width: 200, height: 200 }} />
                  <h2 className="mt-4 text-xl font-bold">{finalResult.name}</h2>
                </div>
              )
            : (
                <div className="text-center text-gray-500">Haz clic en "Girar" para comenzar</div>
              )}
      </Card>
    </div>
  )
}
