import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { getProductionPhasesByCompany, updateProductionPhase, getPhasesAndMachines, addMachineToPhase } from "../../services/production_phases";
import { getMachinesByCompany } from "../../services/company.machines";
import { createProductionPhase } from "../../services/production_phases";

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

  const handleUpdatePhase = async (updatedPhase) => {
    console.log("handleUpdatePhase called", updatedPhase);
    if (!updatedPhase) {
      console.log("No phase selected");
      return;
    }
  
    const updatedData = {
      id: updatedPhase.id,
      name: newName.trim() !== "" ? newName : updatedPhase.name,
      is_active: newActive,
    };
  
    console.log("Updated data before mutation:", updatedData);
  
    if (
      updatedData.name === updatedPhase.name &&
      updatedData.is_active === updatedPhase.is_active
    ) {
      console.log("No changes detected");
      return;
    }
  
    updatePhaseMutation.mutate(updatedData, {
      onSuccess: () => {
        console.log("Update successful");
      },
      onError: (error) => {
        console.error("Update failed", error);
      },
    });
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

export const useCreateProductionPhase = (companyId) => {
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPhaseName, setNewPhaseName] = useState("");
  const [newPhaseActive, setNewPhaseActive] = useState(true);

  const createPhaseMutation = useMutation({
    mutationFn: (data) => createProductionPhase(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["productionPhases", companyId]);
      message.success("Production phase created successfully");
      setIsModalVisible(false);
    },
    onError: () => {
      message.error("Failed to create production phase");
    },
  });

  const handleCreatePhase = () => {
    const data = {
      name: newPhaseName,
      company_id: companyId,
      is_active: newPhaseActive,
    };
    createPhaseMutation.mutate(data);
  };

  return {
    isModalVisible,
    setIsModalVisible,
    newPhaseName,
    setNewPhaseName,
    newPhaseActive,
    setNewPhaseActive,
    handleCreatePhase,
  };
};