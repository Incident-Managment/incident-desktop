import React from "react";
import { Modal, Input, Switch } from "antd";
import { useCreateProductionPhase } from "../../hooks/ProductionHooks/production.hooks";

const CreateProductionPhaseModal = ({ companyId, isVisible, onClose }) => {
  const {
    newPhaseName,
    setNewPhaseName,
    newPhaseActive,
    setNewPhaseActive,
    handleCreatePhase,
  } = useCreateProductionPhase(companyId);

  const handleOk = () => {
    handleCreatePhase();
    onClose();
  };

  return (
    <Modal
      title="Crear Nueva Fase de Producción"
      visible={isVisible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Crear"
      cancelText="Cancelar"
    >
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Nombre de la Fase"
          value={newPhaseName}
          onChange={(e) => setNewPhaseName(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Switch
          checked={newPhaseActive}
          onChange={(checked) => setNewPhaseActive(checked)}
        />
        <span style={{ marginLeft: 8 }}>Activo</span>
      </div>
    </Modal>
  );
};

export default CreateProductionPhaseModal;