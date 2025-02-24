import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { getProductionPhasesByCompany, updateProductionPhase, getPhasesAndMachines, addMachineToPhase } from "../../services/production_phases";
import { getMachinesByCompany } from "../../services/company.machines";

export const useProductionPhases = (companyId) => {
  const queryClient = useQueryClient();
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [newName, setNewName] = useState("");
  const [newOrder, setNewOrder] = useState("");
  const [newActive, setNewActive] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);

  const { data: phases = [], error, isLoading } = useQuery({
    queryKey: ["productionPhases", companyId],
    queryFn: () => getProductionPhasesByCompany(companyId),
    enabled: !!companyId,
    staleTime: Infinity,
  });

  const { data: machines = [], error: machinesError, isLoading: isLoadingMachines } = useQuery({
    queryKey: ["machinesByCompany", companyId],
    queryFn: () => getMachinesByCompany(companyId),
    enabled: !!companyId,
    staleTime: Infinity,
  });

  const updatePhaseMutation = useMutation({
    mutationFn: (updatedData) => updateProductionPhase(updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(["productionPhases", companyId]);
      message.success("Production phase updated successfully");
    },
    onError: () => {
      message.error("Failed to update production phase");
    },
  });

  const addMachineMutation = useMutation({
    mutationFn: (data) => addMachineToPhase(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["phasesAndMachines", selectedPhase.id, companyId]);
      message.success("Machine added to phase successfully");
    },
    onError: () => {
      message.error("Failed to add machine to phase");
    },
  });

  const handleUpdatePhase = async (selectedPhase) => {
    console.log("handleUpdatePhase called");
    if (!selectedPhase) {
      console.log("No phase selected");
      return;
    }
  
    const updatedData = {
      id: selectedPhase.id,
      name: newName.trim() !== "" ? newName : selectedPhase.name,
      phase_order: newOrder !== "" ? parseInt(newOrder, 10) : selectedPhase.phase_order,
      is_active: newActive,
    };
  
    console.log("Updated data:", updatedData);
  
    if (
      updatedData.name === selectedPhase.name &&
      updatedData.phase_order === selectedPhase.phase_order &&
      updatedData.is_active === selectedPhase.is_active
    ) {
      console.log("No changes detected");
      return;
    }
  
    updatePhaseMutation.mutate(updatedData);
  };

  const handleAddMachineToPhase = async () => {
    if (!selectedPhase || !selectedMachine) {
      console.log("No phase or machine selected");
      return;
    }

    const data = {
      production_phase_id: selectedPhase.id,
      machine_id: selectedMachine,
    };

    addMachineMutation.mutate(data);
  };

  return {
    phases,
    selectedPhase,
    setSelectedPhase,
    newName,
    setNewName,
    newOrder,
    setNewOrder,
    newActive,
    setNewActive,
    handleUpdatePhase,
    handleAddMachineToPhase,
    isLoading,
    error,
    machines,
    isLoadingMachines,
    machinesError,
    selectedMachine,
    setSelectedMachine,
  };
};

export const usePhasesAndMachines = (phaseId, companyId) => {
  const cachedUser = localStorage.getItem('user');
  if (!cachedUser) {
    throw new Error('User data not found in cache');
  }
  const parsedUser = JSON.parse(cachedUser);
  if (!parsedUser.user || !parsedUser.user.company || !parsedUser.user.company.id) {
    throw new Error('Invalid company data in cache');
  }
  const cachedCompanyId = parsedUser.user.company.id;

  const { data: phasesAndMachines = [], error: phasesAndMachinesError, isLoading: isLoadingPhasesAndMachines } = useQuery({
    queryKey: ["phasesAndMachines", phaseId, companyId || cachedCompanyId],
    queryFn: () => getPhasesAndMachines(phaseId, companyId || cachedCompanyId),
    enabled: !!phaseId && !!(companyId || cachedCompanyId),
    staleTime: Infinity,
  });

  return {
    phasesAndMachines,
    phasesAndMachinesError,
    isLoadingPhasesAndMachines,
  };
};