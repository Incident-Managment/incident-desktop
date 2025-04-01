import React from "react";
import { Modal, Input } from "antd";
import { useCreateProductionPhase } from "../../hooks/ProductionHooks/production.hooks";

const CreateProductionPhaseModal = ({ companyId, isVisible, onClose }) => {
  const {
    newPhaseName,
    setNewPhaseName,
    handleCreatePhase,
  } = useCreateProductionPhase(companyId);

  const handleOk = () => {
    handleCreatePhase({ is_active: true });
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
    </Modal>
  );
};

export default CreateProductionPhaseModal;