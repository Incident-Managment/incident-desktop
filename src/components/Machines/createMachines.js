import { Modal, Button, Input, Form, Select, message } from "antd";
import { useCreateMachines, useMachineTypes } from "../../hooks/MachinesHooks/companyMachines.hooks";

const fetchCompanyIdFromCache = () => {
  const cachedUser = localStorage.getItem('user');
  if (!cachedUser) {
    throw new Error('User data not found in cache');
  }
  const parsedUser = JSON.parse(cachedUser);
  if (!parsedUser.user || !parsedUser.user.company || !parsedUser.user.company.id) {
    throw new Error('Invalid company data in cache');
  }
  return parsedUser.user.company.id;
};

const CreateMachineModal = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const { mutate: createMachine, isLoading } = useCreateMachines();
  const { data: machineTypes } = useMachineTypes();
  const companyId = fetchCompanyIdFromCache();

  const handleSubmit = (values) => {
    const data = { ...values, company_id: companyId };
    createMachine(data, {
      onSuccess: () => {
        message.success("Machine created successfully");
        form.resetFields();
        onClose();
      },
      onError: () => {
        message.error("Failed to create machine");
      },
    });
  };

  return (
    <Modal
      title="Create Machine"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isLoading}
          onClick={() => form.submit()}
        >
          Create
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter the machine name" }]}
        >
          <Input placeholder="Enter machine name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter the machine description" }]}
        >
          <Input placeholder="Enter machine description" />
        </Form.Item>
        <Form.Item
          name="type_id"
          label="Type"
          rules={[{ required: true, message: "Please select the machine type" }]}
        >
          <Select placeholder="Select machine type">
            {machineTypes?.map((type) => (
              <Select.Option key={type.id} value={type.id}>
                {type.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateMachineModal;