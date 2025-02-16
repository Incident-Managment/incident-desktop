"use client"

import { useState } from "react"
import { Typography, List, Card, Spin, Result, Space, Tag, Modal, Button, Tooltip } from "antd"
import { useMachinesByCompany } from "../../hooks/MachinesHooks/companyMachines.hooks"
import QRCode from "react-qr-code"

const { Title, Text } = Typography

const CompanyMachines = () => {
  const { data: machines, isLoading, error } = useMachinesByCompany()
  const [selectedMachine, setSelectedMachine] = useState(null)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    )
  }

  if (error) {
    return (
      <Result
        status="error"
        title="Error loading machines"
        subTitle="Please try again later or contact support if the problem persists."
      />
    )
  }

  const handleMachineClick = (machine) => {
    setSelectedMachine(machine)
  }

  const closeModal = () => {
    setSelectedMachine(null)
  }

  const getStatusColor = (id) => {
    const colors = ["green", "blue", "orange", "red", "purple"]
    return colors[id % colors.length]
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Title level={2} className="mb-6 text-center">
        Company Machines
      </Title>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        dataSource={machines}
        renderItem={(machine) => (
          <List.Item>
            <Card
              hoverable
              className="w-full shadow-md transition-all duration-300 hover:shadow-xl"
              onClick={() => handleMachineClick(machine)}
            >
              <Card.Meta
                title={
                  <Space>
                    <Text strong>{machine.name}</Text>
                    <Tooltip title={`Status: ${getStatusColor(machine.id)}`}>
                      <div className={`w-3 h-3 rounded-full bg-${getStatusColor(machine.id)}-500`} />
                    </Tooltip>
                  </Space>
                }
                description={
                  <Space direction="vertical" className="w-full">
                    <Tag color="blue">{machine.type.name}</Tag>
                    <Text type="secondary">ID: {machine.id}</Text>
                    <Text type="secondary" className="truncate">
                      Company: {machine.company.name}
                    </Text>
                  </Space>
                }
              />
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title={selectedMachine?.name}
        visible={!!selectedMachine}
        onCancel={closeModal}
        footer={[
          <Button key="close" onClick={closeModal} type="primary">
            Close
          </Button>,
        ]}
        centered
        bodyStyle={{ padding: '20px' }}
      >
        {selectedMachine && (
          <Space direction="vertical" className="w-full" size="large">
            <Text strong>Type: {selectedMachine.type.name}</Text>
            <Text>ID: {selectedMachine.id}</Text>
            <Text>Company: {selectedMachine.company.name}</Text>
            <div className="flex justify-center mt-4">
              <QRCode value={String(selectedMachine.id)} size={256} />
            </div>
          </Space>
        )}
      </Modal>
    </div>
  )
}

export default CompanyMachines