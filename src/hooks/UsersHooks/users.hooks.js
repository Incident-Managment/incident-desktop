import { useQuery, useMutation } from '@tanstack/react-query';
import { getUsers, createUsers, updateUser } from '../../services/users.services';
import { message } from 'antd';

export const useGetUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        staleTime: Infinity,
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

export const useUpdateUser = () => {
    return useMutation({
        mutationFn: updateUser,
        onSuccess: (data) => {
            message.success("Usuario actualizado correctamente");
        },
        onError: (error) => {
            message.error(`Error al actualizar el usuario: ${error.message}`);
        },
    });
};