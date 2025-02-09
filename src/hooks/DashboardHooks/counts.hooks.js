import { useQuery } from '@tanstack/react-query';
import {
  getCountIncidentsByCompany, getCountIncidentsResolvedByCompany,
  averageResolutionTimeByCompany, incidentEfficiencyByCompany
} from "../../services/incident.services";

export const useCountIncidentsByCompany = () => {
  const fetchCompanyId = () => {
    const cachedUser = localStorage.getItem('user');
    if (!cachedUser) {
      console.error('User data not found in cache');
      return null;
    }
    const parsedUser = JSON.parse(cachedUser);
    if (!parsedUser.user || !parsedUser.user.company || !parsedUser.user.company.id) {
      console.error('Invalid company data in cache');
      return null;
    }
    return parsedUser.user.company.id;
  };

  const companyId = fetchCompanyId();

  const { data: countData, isLoading: countLoading, error: countError } = useQuery({
    queryKey: ['countIncidents', companyId],
    queryFn: () => getCountIncidentsByCompany(companyId),
    enabled: !!companyId
  });

  const { data: resolvedCountData, isLoading: resolvedCountLoading, error: resolvedCountError } = useQuery({
    queryKey: ['resolvedCountIncidents', companyId],
    queryFn: () => getCountIncidentsResolvedByCompany(companyId),
    enabled: !!companyId
  });

  const { data: averageResolutionTimeData, isLoading: averageResolutionTimeLoading, error: averageResolutionTimeError } = useQuery({
    queryKey: ['averageResolutionTime', companyId],
    queryFn: () => averageResolutionTimeByCompany(companyId),
    enabled: !!companyId
  });

  const { data: incidentEfficiencyData, isLoading: incidentEfficiencyLoading, error: incidentEfficiencyError } = useQuery({
    queryKey: ['incidentEfficiency', companyId],
    queryFn: () => incidentEfficiencyByCompany(companyId),
    enabled: !!companyId
  });

  return {
    count: countData?.count || 0,
    resolvedCount: resolvedCountData?.count || 0,
    averageResolutionTime: averageResolutionTimeData?.averageResolutionTime || 0,
    incidentEfficiency: incidentEfficiencyData?.productionEfficiency || 0,
    loading: countLoading || resolvedCountLoading || averageResolutionTimeLoading || incidentEfficiencyLoading,
    error: countError || resolvedCountError || averageResolutionTimeError || incidentEfficiencyError
  };
};