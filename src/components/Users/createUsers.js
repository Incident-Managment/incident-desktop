import { Modal, Form, Input, Select, Button, Typography } from "antd"
import { X } from "lucide-react"
import { useGetRolesGlobal } from "../../hooks/RolesHooks/roles.hooks"
import { useGetCompaniesGlobal } from "../../hooks/CompaniesHooks/companies.hooks"
import { useCreateUsers } from "../../hooks/UsersHooks/users.hooks"

const { Title } = Typography

const CreateUserModal = ({ isOpen, onClose, onCreateUser }) => {
  const { data: roles } = useGetRolesGlobal()
  const { data: companies } = useGetCompaniesGlobal()
  const [form] = Form.useForm()
  const { mutate: createUser } = useCreateUsers()

  const handleSubmit = (values) => {
    createUser(values, {
      onSuccess: () => {
        onCreateUser(values)
        form.resetFields()
      },
      onError: (error) => {
        console.error("Error creating user:", error)
      }
    })
  }

  return (
    <Modal
      title={
        <div style={styles.modalHeader}>
          <Title level={4} style={styles.modalTitle}>
            Crear Usuario
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
      <Form form={form} layout="vertical" onFinish={handleSubmit} style={styles.form}>
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
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: "Por favor ingrese la contraseña" }]}
        >
          <Input.Password placeholder="Ingrese la contraseña" />
        </Form.Item>

        <Form.Item label="Rol" name="role_id" rules={[{ required: true, message: "Por favor seleccione un rol" }]}>
          <Select placeholder="Seleccione un rol">
            {roles?.map((role) => (
              <Select.Option key={role.id} value={role.id}>
                {role.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Empresa"
          name="company_id"
          rules={[{ required: true, message: "Por favor seleccione una empresa" }]}
        >
          <Select placeholder="Seleccione una empresa">
            {companies?.map((company) => (
              <Select.Option key={company.id} value={company.id}>
                {company.name}
              </Select.Option>
            ))}
          </Select>
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
            Crear Usuario
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

export default CreateUserModal