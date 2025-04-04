import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCompaniesGlobal, createCompanies, editCompany } from '../../services/company.machines';

export const useGetCompaniesGlobal = () => {
    return useQuery({
        queryKey: ['companies'],
        queryFn: getCompaniesGlobal,
        staleTime: Infinity,
    });
};

export const useCreateCompany = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCompanies,
        onSuccess: () => {
            queryClient.invalidateQueries(['companies']);
        },
        onError: (error) => {
            console.error('Error al crear la empresa:', error);
        },
    });
};

export const useEditCompany = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editCompany,
        onSuccess: () => {
            queryClient.invalidateQueries(['companies']);
        },
        onError: (error) => {
            console.error('Error al editar la empresa:', error);
        },
    });
};