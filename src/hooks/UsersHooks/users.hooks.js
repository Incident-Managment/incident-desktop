import { useQuery, useMutation } from '@tanstack/react-query';
import { getUsers, createUsers, updateUser, getUsersByCompany } from '../../services/users.services';
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

export const useGetUsersByCompany = () => {
    const fetchUsersByCompany = async () => {
        const cachedUser = localStorage.getItem('user');
        if (!cachedUser) {
            throw new Error('User data not found in cache');
        }
        const parsedUser = JSON.parse(cachedUser);
        if (!parsedUser.user || !parsedUser.user.company || !parsedUser.user.company.id) {
            throw new Error('Invalid company data in cache');
        }
        const companyId = parsedUser.user.company.id;
        return getUsersByCompany(companyId);
    };

    return useQuery({
        queryKey: ['usersByCompany'],
        queryFn: fetchUsersByCompany,
        staleTime: Infinity,
    });
};