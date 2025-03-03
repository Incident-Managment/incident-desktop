import { Modal, Form, Input, Select, Button, Typography } from "antd"
import { X } from "lucide-react"
import { useGetRolesGlobal } from "../../hooks/RolesHooks/roles.hooks"
import { useGetCompaniesGlobal } from "../../hooks/CompaniesHooks/companies.hooks"
import { useUpdateUser } from "../../hooks/UsersHooks/users.hooks"

const { Title } = Typography

const UpdateUserModal = ({ isOpen, onClose, user, onUpdateUser }) => {
  const { data: roles } = useGetRolesGlobal()
  const { data: companies } = useGetCompaniesGlobal()
  const [form] = Form.useForm()
  const { mutate: updateUser } = useUpdateUser()

  const handleSubmit = (values) => {
    updateUser({ ...values, id: user.id }, {
      onSuccess: () => {
        onUpdateUser(values)
        form.resetFields()
      },
      onError: (error) => {
        console.error("Error updating user:", error)
      }
    })
  }

  return (
    <Modal
      title={
        <div style={styles.modalHeader}>
          <Title level={4} style={styles.modalTitle}>
            Actualizar Usuario
          </Title>
          <Button type="text" icon={<X size={20} />} onClick={onClose} style={styles.closeButton} />
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={520}
      style={styles.modal}
      closeIcon={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} style={styles.form} initialValues={user}>
        <Form.Item
          label="Nombre completo"
          name="name"
          rules={[{ required: true, message: "Por favor ingrese el nombre" }]}
        >
          <Input placeholder="Ingrese el nombre completo" />
        </Form.Item>

        <Form.Item
          label="Correo electrónico"
          name="email"
          rules={[
            { required: true, message: "Por favor ingrese el correo" },
            { type: "email", message: "Ingrese un correo válido" },
          ]}
        >
          <Input placeholder="ejemplo@correo.com" />
        </Form.Item>

        <Form.Item
          label="Teléfono"
          name="phone_number"
          rules={[{ required: true, message: "Por favor ingrese el teléfono" }]}
        >
          <Input placeholder="Ingrese el número de teléfono" />
        </Form.Item>

        <Form.Item style={styles.submitButton}>
          <Button type="primary" htmlType="submit" block>
            Actualizar Usuario
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const styles = {
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: -20,
  },
  modalTitle: {
    margin: 0,
  },
  closeButton: {
    marginRight: -8,
    marginTop: -4,
  },
  form: {
    marginTop: 24,
  },
  submitButton: {
    marginBottom: 0,
    marginTop: 8,
  },
}

export default UpdateUserModal