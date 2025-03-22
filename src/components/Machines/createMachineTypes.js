import { Modal, Button, Input, Form, message } from "antd";
import { useCreateMachineTypes } from "../../hooks/MachinesHooks/companyMachines.hooks";

const CreateMachineTypeModal = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const { mutate: createMachineType, isLoading } = useCreateMachineTypes();

  const handleSubmit = (values) => {
    createMachineType(values.name, {
      onSuccess: () => {
        message.success("Machine type created successfully");
        form.resetFields();
        onClose();
      },
      onError: () => {
        message.error("Failed to create machine type");
      },
    });
  };

  return (
    <Modal
      title="Crea un nuevo tipo de máquina"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isLoading}
          onClick={() => form.submit()}
        >
          Crear
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Nombre"
          rules={[{ required: true, message: "Please enter the machine type name" }]}
        >
          <Input placeholder="Ingresa el nombre" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateMachineTypeModal;