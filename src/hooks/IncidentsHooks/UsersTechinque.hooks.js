import { useQuery } from '@tanstack/react-query';
import { getechniqueUsersByRoleAndCompany } from '../../services/users.services';

const useTechniqueUsers = (id) => {
    const fetchTechniqueUsers = async () => {
        return await getechniqueUsersByRoleAndCompany(id);
    };

    const { data: users, error, isLoading } = useQuery({
        queryKey: ['techniqueUsers', id],
        queryFn: fetchTechniqueUsers,
    });

    return { users, error, isLoading };
};

export default useTechniqueUsers;