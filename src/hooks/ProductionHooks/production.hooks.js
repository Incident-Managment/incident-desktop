import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { getProductionPhasesByCompany, updateProductionPhase } from "../../services/production_phases";

export const useProductionPhases = (companyId) => {
  const queryClient = useQueryClient();
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [newName, setNewName] = useState("");
  const [newOrder, setNewOrder] = useState("");
  const [newActive, setNewActive] = useState(false);

  const { data: phases = [], error, isLoading } = useQuery({
    queryKey: ["productionPhases", companyId],
    queryFn: () => getProductionPhasesByCompany(companyId),
    enabled: !!companyId,
    staleTime: Infinity,
  });

  const mutation = useMutation({
    mutationFn: (updatedData) => updateProductionPhase(updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(["productionPhases", companyId]);
      message.success("Production phase updated successfully");
    },
    onError: () => {
      message.error("Failed to update production phase");
    },
  });

  const handleUpdatePhase = async () => {
    if (!selectedPhase) return;

    const updatedData = {
      id: selectedPhase.id,
      name: newName.trim() !== "" ? newName : selectedPhase.name,
      phase_order: newOrder !== "" ? parseInt(newOrder, 10) : selectedPhase.phase_order,
      is_active: newActive,
    };

    // Evitar actualizar si no hay cambios
    if (
      updatedData.name === selectedPhase.name &&
      updatedData.phase_order === selectedPhase.phase_order &&
      updatedData.is_active === selectedPhase.is_active
    ) {
      return;
    }

    mutation.mutate(updatedData);
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
    isLoading,
    error,
  };
};