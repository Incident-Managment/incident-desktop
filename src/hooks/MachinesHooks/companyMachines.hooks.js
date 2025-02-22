import { useQuery } from '@tanstack/react-query';
import { getMachinesByCompany, getMachinesByType } from '../../services/company.machines';

const fetchCompanyIdFromCache = () => {
  const cachedUser = localStorage.getItem('user');
  if (!cachedUser) {
    throw new Error('User data not found in cache');
  }
  const parsedUser = JSON.parse(cachedUser);
  if (!parsedUser.user || !parsedUser.user.company || !parsedUser.user.company.id) {
    throw new Error('Invalid company data in cache');
  }
  return parsedUser.user.company.id;
};

export const useMachinesByCompany = () => {
  const fetchMachines = async () => {
    const companyId = fetchCompanyIdFromCache();
    const response = await getMachinesByCompany(companyId);
    return response;
  };

  return useQuery({
    queryKey: ['machinesByCompany'],
    queryFn: fetchMachines,
    staleTime: Infinity,
  });
};

export const useMachinesByType = (typeId) => {
  return useQuery({
    queryKey: ['machinesByType', typeId],
    queryFn: () => getMachinesByType(typeId),
    enabled: !!typeId, // Solo ejecutar la query si typeId está definido
  });
};