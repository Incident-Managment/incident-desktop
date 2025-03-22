import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getIncidentsByCompany, getIncidentStatusHistory, getRecentIncidentsByCompany, getIncidentByStatusWeekAndMonthly, getMonthlyEvolution, getMostCommonProblemsByCategory, getCommonProblemsPercentageToday, cancelIncidents } from '../../services/incident.services';

export const useIncidents = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [statusHistory, setStatusHistory] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  const fetchIncidents = async () => {
    const cachedUser = localStorage.getItem('user');
    if (!cachedUser) {
      throw new Error('User data not found in cache');
    }
    const parsedUser = JSON.parse(cachedUser);
    if (!parsedUser.user || !parsedUser.user.company || !parsedUser.user.company.id) {
      throw new Error('Invalid company data in cache');
    }
    const companyId = parsedUser.user.company.id;
    const response = await getIncidentsByCompany(companyId);
    return response.map((incident) => ({
      id: incident.id,
      title: incident.title,
      description: incident.description,
      status: incident.status.name,
      priority: incident.priority.name,
      category: incident.category.name,
      user: incident.user.name,
      machine: incident.machine.name,
      production_phase: incident.production_phase.name,
      creation_date: incident.creation_date,
      update_date: incident.update_date,
      assigned_task: incident.assigned_task,
      company: incident.company.name,
    }));
  };

  const fetchRecentIncidents = async () => {
    const cachedUser = localStorage.getItem('user');
    if (!cachedUser) {
      throw new Error('User data not found in cache');
    }
    const parsedUser = JSON.parse(cachedUser);
    if (!parsedUser.user || !parsedUser.user.company || !parsedUser.user.company.id) {
      throw new Error('Invalid company data in cache');
    }
    const companyId = parsedUser.user.company.id;
    const response = await getRecentIncidentsByCompany(companyId);
    return response;
  };

  const fetchIncidentsByStatusWeekAndMonthly = async () => {
    const cachedUser = localStorage.getItem('user');
    if (!cachedUser) {
      throw new Error('User data not found in cache');
    }
    const parsedUser = JSON.parse(cachedUser);
    if (!parsedUser.user || !parsedUser.user.company || !parsedUser.user.company.id) {
      throw new Error('Invalid company data in cache');
    }
    const companyId = parsedUser.user.company.id;
    const response = await getIncidentByStatusWeekAndMonthly(companyId);
    return response;
  };

  const fetchMonthlyEvolution = async () => {
    const cachedUser = localStorage.getItem('user');
    if (!cachedUser) {
      throw new Error('User data not found in cache');
    }
    const parsedUser = JSON.parse(cachedUser);
    if (!parsedUser.user || !parsedUser.user.company || !parsedUser.user.company.id) {
      throw new Error('Invalid company data in cache');
    }
    const companyId = parsedUser.user.company.id;
    const response = await getMonthlyEvolution(companyId);
    return response.incidentsData;
  };

  const fetchMostCommonProblemsByCategory = async () => {
    const cachedUser = localStorage.getItem('user');
    if (!cachedUser) {
      throw new Error('User data not found in cache');
    }
    const parsedUser = JSON.parse(cachedUser);
    if (!parsedUser.user || !parsedUser.user.company || !parsedUser.user.company.id) {
      throw new Error('Invalid company data in cache');
    }
    const companyId = parsedUser.user.company.id;
    const response = await getMostCommonProblemsByCategory(companyId);
    return response;
  };

  const fetchCommonProblemsPercentageToday = async () => {
    const cachedUser = localStorage.getItem('user');
    if (!cachedUser) {
      throw new Error('User data not found in cache');
    }
    const parsedUser = JSON.parse(cachedUser);
    if (!parsedUser.user || !parsedUser.user.company || !parsedUser.user.company.id) {
      throw new Error('Invalid company data in cache');
    }
    const companyId = parsedUser.user.company.id;
    const response = await getCommonProblemsPercentageToday(companyId);
    return response;
  };

  const cancelIncidentMutation = useMutation({
    mutationFn: async ({ incident_id, comments, user_id }) => {
      await cancelIncidents({ incident_id, comments, user_id });
    },
    onError: (error) => {
      console.error('Error canceling incident:', error);
    },
  });
  
  const handleCancelIncident = ({ incident_id, comments, user_id }) => {
    cancelIncidentMutation.mutate({ incident_id, comments, user_id });
  };

  const { data: incidents = [], error, isLoading } = useQuery({
    queryKey: ['incidents'],
    queryFn: fetchIncidents,
    staleTime: Infinity,
  });

  const { data: recentIncidents = [], error: recentError, isLoading: recentLoading } = useQuery({
    queryKey: ['recentIncidents'],
    queryFn: fetchRecentIncidents,
    staleTime: Infinity,
  });

  const { data: incidentsByStatus = [], error: statusError, isLoading: statusLoading } = useQuery({
    queryKey: ['incidentsByStatus'],
    queryFn: fetchIncidentsByStatusWeekAndMonthly,
    staleTime: Infinity,
  });

  const { data: monthlyEvolution = {}, error: monthlyEvolutionError, isLoading: monthlyEvolutionLoading } = useQuery({
    queryKey: ['monthlyEvolution'],
    queryFn: fetchMonthlyEvolution,
    staleTime: Infinity,
  });

  const { data: mostCommonProblems = {}, error: mostCommonProblemsError, isLoading: mostCommonProblemsLoading } = useQuery({
    queryKey: ['mostCommonProblems'],
    queryFn: fetchMostCommonProblemsByCategory,
    staleTime: Infinity,
  });

  const { data: commonProblemsPercentageToday = {}, error: commonProblemsError, isLoading: commonProblemsLoading } = useQuery({
    queryKey: ['commonProblemsPercentageToday'],
    queryFn: fetchCommonProblemsPercentageToday,
    staleTime: Infinity,
  });

  const handleIncidentClick = async (incidentId) => {
    try {
      const history = await getIncidentStatusHistory(incidentId);
      setStatusHistory(history);
      setSelectedIncident(incidentId);
      setDrawerVisible(true);
    } catch (error) {
      console.error('Error fetching incident status history:', error);
    }
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setStatusHistory([]);
    setSelectedIncident(null);
  };

  return {
    incidents,
    recentIncidents,
    incidentsByStatus,
    monthlyEvolution,
    mostCommonProblems,
    drawerVisible,
    statusHistory,
    selectedIncident,
    handleIncidentClick,
    closeDrawer,
    error,
    recentError,
    statusError,
    monthlyEvolutionError,
    mostCommonProblemsError,
    isLoading,
    recentLoading,
    statusLoading,
    monthlyEvolutionLoading,
    mostCommonProblemsLoading,
    commonProblemsPercentageToday,
    commonProblemsError,
    commonProblemsLoading,
    handleCancelIncident,
    cancelModalVisible,
    setCancelModalVisible,
  };
};