import { useState, useEffect } from 'react';
import { getIncidentsByCompany, getIncidentStatusHistory } from '../../services/incident.services';

export const useIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [statusHistory, setStatusHistory] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const cachedUser = localStorage.getItem('user');
        if (!cachedUser) {
          throw new Error('User data not found in cache');
        }
        const parsedUser = JSON.parse(cachedUser);
        if (!parsedUser.user || !parsedUser.user.company || !parsedUser.user.company.id) {
          throw new Error('Invalid company data in cache');
        }
        const companyId = parsedUser.user.company.id;
        console.log(`Fetching incidents for company ID: ${companyId}`);
        const response = await getIncidentsByCompany(companyId);
        const mappedIncidents = response.map((incident) => ({
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
          assigned_tasks: incident.assigned_tasks,
        }));
        setIncidents(mappedIncidents);
      } catch (error) {
        console.error('Error fetching incidents:', error);
      }
    };

    fetchIncidents();
  }, []);

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
    drawerVisible,
    statusHistory,
    selectedIncident,
    handleIncidentClick,
    closeDrawer,
  };
};