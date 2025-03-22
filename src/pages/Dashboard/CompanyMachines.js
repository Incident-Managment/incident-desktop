"use client"

import { useState, useRef } from "react"
import { Typography, Table, Spin, Result, Space, Tag, Modal, Button, Tooltip } from "antd"
import { useMachinesByCompany } from "../../hooks/MachinesHooks/companyMachines.hooks"
import QRCode from "react-qr-code"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

const { Title, Text } = Typography

const CompanyMachines = () => {
  const { data: machines, isLoading, error } = useMachinesByCompany()
  const [selectedMachine, setSelectedMachine] = useState(null)
  const pdfRef = useRef(null)

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

  const generatePDF = async () => {
    if (!pdfRef.current) return
    const canvas = await html2canvas(pdfRef.current)
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF()
    pdf.addImage(imgData, "PNG", 10, 10, 180, 0)
    pdf.save(`Machine_${selectedMachine.id}.pdf`)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, machine) => (
        <Space>
          <Text strong>{text}</Text>
          <Tooltip title={`Status: ${getStatusColor(machine.id)}`}>
            <div className={`w-3 h-3 rounded-full bg-${getStatusColor(machine.id)}-500`} />
          </Tooltip>
        </Space>
      )
    },
    {
      title: 'Type',
      dataIndex: ['type', 'name'],
      key: 'type',
      render: (text) => <Tag color="blue">{text}</Tag>
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Company',
      dataIndex: ['company', 'name'],
      key: 'company',
      render: (text) => <Text type="secondary" className="truncate">{text}</Text>
    }
  ]

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Title level={2} className="mb-6 text-center">
        Company Machines
      </Title>
      <Table
        columns={columns}
        dataSource={machines}
        rowKey="id"
        onRow={(machine) => ({
          onClick: () => handleMachineClick(machine)
        })}
      />
      <Modal
        title={selectedMachine?.name}
        visible={!!selectedMachine}
        onCancel={closeModal}
        footer={[
          <Button key="close" onClick={closeModal} type="default">
            Close
          </Button>,
          <Button key="print" onClick={generatePDF} type="primary">
            Print PDF
          </Button>
        ]}
        centered
        style={{ body: { padding: '20px' } }}
      >
        {selectedMachine && (
          <div ref={pdfRef} className="p-4 bg-white">
            <Space direction="vertical" className="w-full" size="large">
              <Text strong>Type: {selectedMachine.type.name}</Text>
              <Text>ID: {selectedMachine.id}</Text>
              <Text>Company: {selectedMachine.company.name}</Text>
              <div className="flex justify-center mt-4">
                <QRCode value={String(selectedMachine.id)} size={256} />
              </div>
            </Space>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default CompanyMachines