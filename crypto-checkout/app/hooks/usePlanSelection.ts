'use client';

import { useState } from 'react';

export type PlanType = 'monthly' | 'yearly';

interface UsePlanSelectionReturn {
  selectedPlan: PlanType;
  showOrderDetails: boolean;
  setSelectedPlan: (plan: PlanType) => void;
  setShowOrderDetails: (show: boolean) => void;
  handleShowOrderDetails: () => void;
  handleCloseOrderDetails: () => void;
}

/**
 * Custom hook per gestire la selezione del piano di abbonamento
 * e lo stato del popup OrderSummary
 */
export function usePlanSelection(): UsePlanSelectionReturn {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('monthly');
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const handleShowOrderDetails = () => {
    setShowOrderDetails(true);
  };

  const handleCloseOrderDetails = () => {
    setShowOrderDetails(false);
  };

  return {
    selectedPlan,
    showOrderDetails,
    setSelectedPlan,
    setShowOrderDetails,
    handleShowOrderDetails,
    handleCloseOrderDetails,
  };
}