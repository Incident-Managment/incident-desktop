import { useQuery } from '@tanstack/react-query';
import { getRolesGlobal } from '../../services/roles.services';

export const useGetRolesGlobal = () => {
    return useQuery({
        queryKey: ['roles'],
        queryFn: getRolesGlobal,
        staleTime: Infinity,
    });
};
