import { useQuery } from '@tanstack/react-query';
import { getCompaniesGlobal } from '../../services/company.machines';

export const useGetCompaniesGlobal = () => {
    return useQuery({
        queryKey: ['companies'],
        queryFn: getCompaniesGlobal,
    });
};
