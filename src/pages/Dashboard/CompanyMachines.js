"use client"

import { useState, useRef } from "react"
import { Typography, Table, Space, Tag, Modal, Button, Tooltip, Tabs } from "antd"
import { useMachinesByCompany, useMachineTypes } from "../../hooks/MachinesHooks/companyMachines.hooks"
import QRCode from "react-qr-code"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import CreateMachineTypeModal from "../../components/Machines/createMachineTypes"
import CreateMachineModal from "../../components/Machines/createMachines"
const { Title, Text } = Typography;

const CompanyMachines = () => {
  const { data: machines } = useMachinesByCompany();
  const { data: machineTypes } = useMachineTypes();
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isCreateMachineModalVisible, setIsCreateMachineModalVisible] = useState(false);
  const pdfRef = useRef(null);

  const handleMachineClick = (machine) => {
    setSelectedMachine(machine);
  };

  const closeModal = () => {
    setSelectedMachine(null);
  };

  const getStatusColor = (id) => {
    const colors = ["green", "blue", "orange", "red", "purple"];
    return colors[id % colors.length];
  };

  const generatePDF = async () => {
    if (!pdfRef.current) return;
    const canvas = await html2canvas(pdfRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 0);
    pdf.save(`Machine_${selectedMachine.id}.pdf`);
  };

  const machineColumns = [
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
      title: 'Company',
      dataIndex: ['company', 'name'],
      key: 'company',
      render: (text) => <Text type="secondary" className="truncate">{text}</Text>
    }
  ];

  const typeColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title>
          Maquinas
        </Title>
        <div style={{ marginTop: "20px" }}>
          <Button
            type="primary"
            onClick={() => setIsCreateMachineModalVisible(true)}
            style={{ marginRight: "10px", backgroundColor: "#1890ff" }}
          >
            Crear Maquina
          </Button>
          <Button type="primary" onClick={() => setIsCreateModalVisible(true)} style={{ backgroundColor: "#1890ff" }}>
            Crear Tipo de Maquina
          </Button>
        </div>
      </div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Listado de Maquinas" key="1">
          <Table
            columns={machineColumns}
            dataSource={machines}
            rowKey="id"
            onRow={(machine) => ({
              onClick: () => handleMachineClick(machine)
            })}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tipos de Maquinas" key="2">
          <Table
            columns={typeColumns}
            dataSource={machineTypes}
            rowKey="id"
          />
        </Tabs.TabPane>
      </Tabs>
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
              <Text>Company: {selectedMachine.company.name}</Text>
              <div className="flex justify-center mt-4">
                <QRCode value={String(selectedMachine.id)} size={256} />
              </div>
            </Space>
          </div>
        )}
      </Modal>
      <CreateMachineTypeModal
        visible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
      />
      <CreateMachineModal
        visible={isCreateMachineModalVisible}
        onClose={() => setIsCreateMachineModalVisible(false)}
      />
    </div>
  );
};

export default CompanyMachines;