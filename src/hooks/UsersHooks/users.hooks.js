import { useQuery, useMutation } from '@tanstack/react-query';
import { getUsers, createUsers } from '../../services/users.services';
import { message } from 'antd';

export const useGetUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });
};

export const useCreateUsers = () => {
    return useMutation({
        mutationFn: createUsers,
        onSuccess: (data) => {
            message.success("Usuario creado correctamente");
        },
        onError: (error) => {
            message.error(`Error al crear el usuario: ${error.message}`);
        },
    });
};