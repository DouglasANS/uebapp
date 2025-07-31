import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      // Estados que serão persistidos
      userData: null,
      currentSystem: 'ios',
      termosAceitos: false,
      
      // Funções de ação (NÃO serão persistidas)
      setUserData: (data) => set({ userData: data }),
      setCurrentSystem: (system) => set({ currentSystem: system }),
      aceitarTermos: () => set({ termosAceitos: true }),
      clearUserData: () => set({ userData: null, termosAceitos: false }),
      updateUserField: (field, value) => set((state) => ({
        userData: state.userData ? { ...state.userData, [field]: value } : null
      })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      
      // Especifica EXATAMENTE o que será persistido
      partialize: (state) => ({
        userData: state.userData,
        currentSystem: state.currentSystem,
        termosAceitos: state.termosAceitos
      })
    }
  )
);

export default useUserStore;