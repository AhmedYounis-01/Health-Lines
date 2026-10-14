import { useContext } from 'react';
import { ClinicContext } from './clinicContextInstance';

export function useClinicContext() {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinicContext must be used within a ClinicContextProvider');
  }
  return context;
}

export default useClinicContext;
