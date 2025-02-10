import { useMutation } from '@tanstack/react-query';
import { assigned_tasks } from '../../services/task.services';
import { message } from 'antd';

const useAssignedTasks = () => {
    const mutation = useMutation({
        mutationFn: ({ incident_id, assigned_user_id, company_id, assignment_date }) => 
            assigned_tasks(incident_id, assigned_user_id, company_id, assignment_date),
        onSuccess: (data) => {
            message.success("Tarea asignada correctamente");
        },
        onError: (error) => {
            message.error(`Error al asignar la tarea: ${error.message}`);
        },
    });

    return mutation;
};

export default useAssignedTasks;