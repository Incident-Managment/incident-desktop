import React, { useState } from 'react';
import { Popover, Form, Select, message, Tooltip, Button } from 'antd';
import { UserCheck } from 'lucide-react';
import useAssignedTasks from '../../hooks/IncidentsHooks/assigned_tasks.hooks';
import useTechniqueUsers from '../../hooks/IncidentsHooks/UsersTechinque.hooks';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

const { Option } = Select;

const AssignTaskPopover = ({ incidentId }) => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const { mutate: assignTask, isLoading } = useAssignedTasks();
    const cachedUser = JSON.parse(localStorage.getItem('user'));
    const companyId = cachedUser?.user?.company?.id;
    const { users: technicians, isLoading: isLoadingTechnicians } = useTechniqueUsers(companyId);

    const handleAssignTask = (values) => {
        const { assigned_user_id } = values;
        const assignment_date = dayjs().tz('America/Tijuana').format('YYYY-MM-DD HH:mm:ss');
        assignTask({
            incident_id: incidentId,
            assigned_user_id,
            company_id: companyId,
            assignment_date,
        }, {
            onSuccess: () => {
                message.success('Tarea asignada correctamente');
                setVisible(false);
            },
            onError: () => {
                message.error('Error al asignar la tarea');
            }
        });
    };

    const content = (
        <Form form={form} layout="vertical" onFinish={handleAssignTask}>
            <Form.Item
                name="assigned_user_id"
                label="Técnico"
                rules={[{ required: true, message: 'Por favor seleccione un técnico' }]}
            >
                <Select loading={isLoadingTechnicians} placeholder="Seleccione un técnico">
                    {technicians?.map((tech) => (
                        <Option key={tech.id} value={tech.id}>
                            {tech.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
            Asignar
            </Button>
            </Form.Item>
        </Form>
    );

    return (
        <Popover
            content={content}
            title="Asignar tarea a técnico"
            trigger="click"
            open={visible}
            onOpenChange={setVisible}
        >
            <Tooltip title="Asignar tarea">
                <span onClick={(e) => e.stopPropagation()} style={{ cursor: 'pointer' }}>
                    <UserCheck size={18} />
                </span>
            </Tooltip>
        </Popover>
    );
};

export default AssignTaskPopover;