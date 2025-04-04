import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { useCreateCompany } from '../../hooks/CompaniesHooks/companies.hooks';

const CreateCompaniesModal = ({ isVisible, onClose }) => {
  const [form] = Form.useForm();
  const { mutate: createCompany, isLoading } = useCreateCompany();

  const handleSubmit = () => {
    form.validateFields()
      .then((values) => {
        createCompany(values, {
          onSuccess: () => {
            message.success('Empresa creada exitosamente');
            form.resetFields();
            onClose();
          },
          onError: () => {
            message.error('Error al crear la empresa');
          },
        });
      })
      .catch((info) => {
        console.error('Validación fallida:', info);
      });
  };

  return (
    <Modal
      title="Crear Empresa"
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" loading={isLoading} onClick={handleSubmit}>
          Crear
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Nombre"
          rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
        >
          <Input placeholder="Nombre de la empresa" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Dirección"
          rules={[{ required: true, message: 'Por favor ingrese la dirección' }]}
        >
          <Input placeholder="Dirección de la empresa" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Teléfono"
          rules={[{ required: true, message: 'Por favor ingrese el teléfono' }]}
        >
          <Input placeholder="Teléfono de la empresa" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Por favor ingrese el email' },
            { type: 'email', message: 'Por favor ingrese un email válido' },
          ]}
        >
          <Input placeholder="Email de la empresa" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCompaniesModal;