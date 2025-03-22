import React, { useState } from 'react';
import { Modal, Input } from 'antd';

const { TextArea } = Input;

const CancelIncidentModal = ({ visible, onCancel, onConfirm, selectedIncident }) => {
  const [comments, setComments] = useState('');

  const handleConfirm = () => {
    if (selectedIncident) {
      onConfirm(selectedIncident, comments); // Pasa selectedIncident y comments
      setComments('');
    } else {
      console.error('No incident selected');
    }
  };

  return (
    <Modal
      title="Cancelar Incidencia"
      visible={visible}
      onCancel={onCancel}
      onOk={handleConfirm}
    >
      <TextArea
        rows={4}
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        placeholder="Razón de la cancelación"
      />
    </Modal>
  );
};

export default CancelIncidentModal;