"use client"
import { Button, Result, Typography, Layout } from "antd"
import { AlertTriangle, Home, ArrowLeft } from "lucide-react"

const { Content } = Layout
const { Paragraph, Text } = Typography

export default function NotFound() {
  return (
    <Layout className="min-h-screen bg-white">
      <Content className="flex items-center justify-center p-4">
        <Result
          status="404"
          title="404"
          subTitle="Lo sentimos, la página que estás buscando no existe."
          icon={<AlertTriangle size={64} className="text-yellow-500" />}
          extra={
            <div className="flex flex-col items-center gap-4">
              <Paragraph>
                <Text strong>
                  La página que has solicitado no se pudo encontrar. Por favor, verifica la URL o regresa a la página de
                  inicio.
                </Text>
              </Paragraph>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button type="primary" size="large" icon={<Home size={16} />}>
                  <a href="/dashboard">Ir a Inicio</a>
                </Button>
                <Button size="large" icon={<ArrowLeft size={16} />} onClick={() => window.history.back()}>
                  Regresar
                </Button>
              </div>
            </div>
          }
        />
      </Content>
    </Layout>
  )
}