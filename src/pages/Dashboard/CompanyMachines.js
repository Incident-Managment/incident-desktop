"use client"

import { useState, useEffect } from "react";
import { Card, Typography, Row, Col, Space, Tag, Spin, Modal, Tooltip } from "antd";
import { HardDrive, QrCode } from "lucide-react";
import { getMachinesByCompany, getMachinesByType } from "../../services/company.machines";
import QRCode from "react-qr-code";

const { Title, Text } = Typography;

const getMachineCategoryColor = (category) => {
  switch (category) {
    case "Manufactura":
      return "blue";
    case "Mantenimiento":
      return "green";
    default:
      return "gray";
  }
};

const Machines = ({ companyId, typeId }) => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isQRModalVisible, setIsQRModalVisible] = useState(false);
  const [selectedMachineId, setSelectedMachineId] = useState(null);

  useEffect(() => {
    const fetchMachines = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = companyId ? await getMachinesByCompany(companyId) : await getMachinesByType(typeId);
        setMachines(result);
      } catch (err) {
        setError("Error al cargar las máquinas");
      } finally {
        setLoading(false);
      }
    };
    fetchMachines();
  }, [companyId, typeId]);

  const showQRModal = (machineId) => {
    setSelectedMachineId(machineId);
    setIsQRModalVisible(true);
  };

  const handleQRModalCancel = () => {
    setIsQRModalVisible(false);
    setSelectedMachineId(null);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div style={{ textAlign: "center", padding: "2rem" }}>{error}</div>;
  }

  return (
    <div style={{ minHeight: "100vh", padding: "4rem", backgroundColor: "#f9f9f9" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Title level={2} style={{ marginBottom: "2rem", textAlign: "center" }}>Máquinas</Title>
        <Row gutter={[24, 24]}>
          {machines.map((machine) => (
            <Col xs={24} sm={12} lg={8} key={machine.id}>
              <Card
                hoverable
                style={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                actions={[
                  <Tooltip key={machine.id} title="Ver código QR">
                    <QrCode size={22} onClick={() => showQRModal(machine.id)} style={{ cursor: "pointer" }} />
                  </Tooltip>,
                ]}
              >
                <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                  <Tag color={getMachineCategoryColor(machine.category)}>{machine.category}</Tag>
                  <Title level={4}>{machine.name}</Title>
                  <Text type="secondary" style={{ display: "block", marginBottom: "1rem" }}>
                    {machine.description}
                  </Text>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Space>
                        <HardDrive size={16} />
                        <Text type="secondary">{machine.type?.name}</Text>
                      </Space>
                    </Col>
                  </Row>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Modal
        title="Código QR de la Máquina"
        open={isQRModalVisible}
        onCancel={handleQRModalCancel}
        footer={null}
        centered
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
          <QRCode value={`https://yourdomain.com/machines/${selectedMachineId}`} size={256} />
        </div>
      </Modal>
    </div>
  );
};

export default Machines;
